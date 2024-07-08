import { useState, createContext, ReactNode, Dispatch, SetStateAction, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import useTimer from "../hooks/useTimer"
import useTestResults from "../pages/TestResults/hooks/useTestResults"

import { Keystroke, TestResult, TimerStage } from "../types"

type TestManagerContextProps = {
  timer: number
  timerStage: TimerStage
  startTimer: () => void
  stopTimer: () => void
  testDuration: number
  setTestDuration: Dispatch<SetStateAction<number>>
  testResults: TestResult | null
  finalizeTest: (keystrokes: Keystroke[]) => void
}

export const TestManagerContext = createContext<TestManagerContextProps>({} as TestManagerContextProps)

export default function TestManagerContextProvider({ children }: { children: ReactNode }) {
  const [testDuration, setTestDuration] = useState(15)

  const navigate = useNavigate()
  const { timer, timerStage, startTimer, stopTimer, resetTimer } = useTimer({ duration: testDuration })
  const { testResults, processTestResults } = useTestResults()

  const finalizeTest = useCallback(
    (keystrokes: Keystroke[]) => {
      processTestResults(keystrokes, testDuration)

      resetTimer()
      navigate("/results")
    },
    [testDuration]
  )

  return (
    <TestManagerContext.Provider
      value={{
        timer,
        timerStage,
        startTimer,
        stopTimer,
        testDuration,
        setTestDuration,
        testResults,
        finalizeTest
      }}
    >
      {children}
    </TestManagerContext.Provider>
  )
}
