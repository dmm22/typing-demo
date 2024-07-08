import { useState, useRef, useCallback, useEffect } from "react"
import { TimerStage } from "../types"

type TimerOptions = { duration: number; isStopWatch?: never }
type StopwatchOptions = { isStopWatch: true; duration?: never }
type UseTimerProps = TimerOptions | StopwatchOptions

export default function useTimer({ duration, isStopWatch }: UseTimerProps) {
  const [timer, setTimer] = useState(duration || 0)
  const [timerStage, setTimerStage] = useState<TimerStage>("stopped")
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    resetTimer()

    setTimer(duration!)
  }, [duration])

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null || timerStage === "complete") return

    setTimerStage("running")
    intervalRef.current = window.setInterval(() => {
      setTimer(currentTime => {
        const newTime = !isStopWatch ? Math.max(currentTime - 1, 0) : currentTime + 1

        if (!isStopWatch && newTime === 0) {
          setTimerStage("complete")
          clearInterval(intervalRef.current!)
        }

        return newTime
      })
    }, 1000)
  }, [isStopWatch, timerStage])

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (timerStage !== "complete") setTimerStage("stopped")
  }, [timerStage])

  const resetTimer = useCallback(() => {
    stopTimer()
    setTimer(!isStopWatch ? duration || 0 : 0)
    setTimerStage("stopped")
  }, [isStopWatch, duration, stopTimer])

  return { timer, timerStage, startTimer, stopTimer, resetTimer }
}
