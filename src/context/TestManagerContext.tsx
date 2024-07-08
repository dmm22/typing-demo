import { useState, createContext, ReactNode, Dispatch, SetStateAction, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import useTimer from "../hooks/useTimer"
import useTestResults from "../pages/TestResults/hooks/useTestResults"

import { Keystroke, TestChartData, TestResult, TimerStage } from "../types"
import useTestChartStats from "../pages/TestResults/hooks/useTestChartStats"

type TestManagerContextProps = {
  timer: number
  timerStage: TimerStage
  startTimer: () => void
  stopTimer: () => void
  testDuration: number
  setTestDuration: Dispatch<SetStateAction<number>>
  testResults: TestResult | null
  finalizeTest: (keystrokes: Keystroke[]) => void
  testChartData: TestChartData | null
}

export const TestManagerContext = createContext<TestManagerContextProps>({} as TestManagerContextProps)

export default function TestManagerContextProvider({ children }: { children: ReactNode }) {
  const [testDuration, setTestDuration] = useState(15)

  const navigate = useNavigate()
  const { timer, timerStage, startTimer, stopTimer, resetTimer } = useTimer({ duration: testDuration })
  const { testResults, processTestResults } = useTestResults()
  const { testChartData, getTestChartData } = useTestChartStats()

  const finalizeTest = useCallback(
    (keystrokes: Keystroke[]) => {
      processTestResults(keystrokes, testDuration)

      getTestChartData({ keystrokes, testDuration })
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
        finalizeTest,
        testChartData
      }}
    >
      {children}
    </TestManagerContext.Provider>
  )
}
