import { useState } from "react"

import { calculateAccuracy, calculateWpm } from "../../../utils/calculationUtils"
import { Keystroke, TestChartData } from "../../../types"

type ChartDataParams = {
  keystrokes: Keystroke[]
  testDuration: number
}

const useTestChartStats = () => {
  const [testChartData, setChartData] = useState<TestChartData | null>(null)

  const getTestChartData = ({ keystrokes, testDuration }: ChartDataParams) => {
    let correctKeyCount = 0
    let totalKeyCount = 0
    let previousTimeElapsed = 0

    let wpm = Array(testDuration).fill(0)
    let accuracy = Array(testDuration).fill(100)
    let errors = Array(testDuration).fill("")

    keystrokes.forEach(({ key, result, timeElapsed }, i) => {
      const isLastKeystroke = i >= keystrokes.length - 1
      const isNewSecond = timeElapsed !== previousTimeElapsed

      totalKeyCount++

      if (result === "correct") correctKeyCount++
      if (result === "incorrect") errors[timeElapsed] += formatErrorKey(key, errors[timeElapsed])

      if (isNewSecond || isLastKeystroke) {
        const elapsedSeconds = timeElapsed !== null ? timeElapsed + 1 : testDuration

        wpm[timeElapsed] = calculateWpm(elapsedSeconds, correctKeyCount)
        accuracy[timeElapsed] = calculateAccuracy(correctKeyCount, totalKeyCount)
      }

      previousTimeElapsed = timeElapsed
    })

    setChartData({ wpm, accuracy, errors })
  }

  const formatErrorKey = (key: string, previousErrorKeys: string) => {
    let formattedKey = key

    if (key === " ") formattedKey = "_"

    if (!previousErrorKeys) return formattedKey
    return `,${formattedKey}`
  }

  return { testChartData, getTestChartData }
}

export default useTestChartStats
