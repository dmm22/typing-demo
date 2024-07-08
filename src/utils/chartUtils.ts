import { ChartDataset } from "chart.js"

export const getLineDataset = (params: Partial<ChartDataset<"line">>) => {
  return {
    ...params,
    type: "line",
    borderWidth: 2,
    fill: false,
    tension: 0.4
  } as ChartDataset<"line">
}

export const getChartLabels = (
  totalElementCount: number,
  labelCount: number,
  callback?: (value: number) => string
) => {
  const stepSize = (totalElementCount / (labelCount - 1)).toFixed(0)

  return Array.from({ length: labelCount }, (_, i) => {
    if (i === 0) return ""

    const roundedStep = Math.round(i * +stepSize)

    if (callback) return callback(roundedStep)
    return roundedStep.toString()
  })
}

export const getHighestYValue = (arrays: number[][]) => {
  const multipleToRoundTo = 5

  const highestValue = Math.max(...arrays.flat())
  return Math.ceil(highestValue / multipleToRoundTo) * multipleToRoundTo + 10
}
