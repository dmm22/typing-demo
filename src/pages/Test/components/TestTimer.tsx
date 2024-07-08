import useTimer from "../../../hooks/useTimer"
import { formatSecondsAsMMSS } from "../../../utils/formattingUtils"

export default function TestTimer() {
  const { timer, timerStage, startTimer, stopTimer, resetTimer } = useTimer({ duration: 15 })
  return <time className="text-5xl font-medium text-center">{formatSecondsAsMMSS(timer)}</time>
}
