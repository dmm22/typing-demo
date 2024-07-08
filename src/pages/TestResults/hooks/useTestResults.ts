import { useCallback, useState } from "react"

import { calculateAccuracy, calculateWpm } from "../../../utils/calculationUtils"

import { Keystroke, TestResult } from "../../../types"

const useTestResults = () => {
  const [testResults, setTestResults] = useState<TestResult | null>(null)

  const processTestResults = useCallback((keystrokes: Keystroke[], testDuration: number) => {
    const { totalKeystrokes, correctKeystrokes } = getKeystrokeCounts(keystrokes)

    const wpm = calculateWpm(testDuration, correctKeystrokes)
    const accuracy = calculateAccuracy(correctKeystrokes, totalKeystrokes)

    const newTestResults = {
      testDuration,
      totalKeystrokes,
      correctKeystrokes,
      wpm,
      accuracy
    }

    setTestResults(newTestResults)
    return newTestResults
  }, [])

  const getKeystrokeCounts = useCallback((keystrokes: Keystroke[]) => {
    const correctKeystrokes = keystrokes.filter(keystroke => keystroke.result === "correct")
    const totalKeystrokes = keystrokes.length

    return { totalKeystrokes, correctKeystrokes: correctKeystrokes.length }
  }, [])

  return { testResults, processTestResults }
}

export default useTestResults
