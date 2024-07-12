import { useCallback, useMemo } from "react"

import useLocalStorage from "../../../hooks/useLocalStorage"

import { calculateAverage } from "../../../utils/calculationUtils"

import { SavedTest, TestResult } from "../../../types"

const useSavedTests = () => {
  const [savedTests, setSavedTests] = useLocalStorage<SavedTest[]>("savedTests", [])

  const saveTest = useCallback(
    (test: TestResult) => {
      const newTest = {
        ...test,
        date: new Date()
      }

      setSavedTests(savedTests => [...savedTests, newTest])
    },
    [savedTests]
  )

  const savedTestSummary = useMemo(() => {
    const wpmArray = savedTests.map(test => test.wpm)
    const accuracyArray = savedTests.map(test => test.accuracy)
    const totalKeystrokesArray = savedTests.map(test => test.totalKeystrokes)

    const averageWpm = calculateAverage(wpmArray).toFixed(0)
    const averageAccuracy = `${calculateAverage(accuracyArray).toFixed(1)}%`
    const totalKeystrokes = totalKeystrokesArray.reduce((total, keystrokes) => total + keystrokes, 0)
    const joinDate = new Date(Math.min(...savedTests.map(test => new Date(test.date).getTime())))
    const testCount = savedTests.length

    return {
      averageWpm: testCount > 0 ? averageWpm : "N/A",
      averageAccuracy: testCount > 0 ? averageAccuracy : "N/A",
      totalKeystrokes,
      joinDate: testCount > 0 ? joinDate : "N/A",
      testCount
    }
  }, [savedTests])

  return { savedTests, saveTest, savedTestSummary }
}

export default useSavedTests
