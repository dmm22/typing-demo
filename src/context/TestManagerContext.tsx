import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react"

import useTimer from "../hooks/useTimer"

import { TimerStage } from "../types"

type TestManagerContextProps = {
  timer: number
  timerStage: TimerStage
  startTimer: () => void
  stopTimer: () => void
  testDuration: number
  setTestDuration: Dispatch<SetStateAction<number>>
}

export const TestManagerContext = createContext<TestManagerContextProps>({} as TestManagerContextProps)

export default function TestManagerContextProvider({ children }: { children: ReactNode }) {
  const [testDuration, setTestDuration] = useState(15)
  const { timer, timerStage, startTimer, stopTimer, resetTimer } = useTimer({ duration: testDuration })

  return (
    <TestManagerContext.Provider
      value={{
        timer,
        timerStage,
        startTimer,
        stopTimer,
        testDuration,
        setTestDuration
      }}
    >
      {children}
    </TestManagerContext.Provider>
  )
}
