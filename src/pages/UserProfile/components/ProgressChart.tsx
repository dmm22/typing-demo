import { useContext } from "react"
import { ChartOptions } from "chart.js"

import Chart from "../../../components/Chart"

import { TestManagerContext } from "../../../context/TestManagerContext"

import { extractProperties } from "../../../utils/arrayUtils"
import { getChartLabels, getHighestYValue } from "../../../utils/chartUtils"

import { defaultChartColors } from "../../../config/chartConfig"

export default function ProgressChart() {
  const { savedTests } = useContext(TestManagerContext)

  const { wpm, accuracy } = extractProperties(savedTests, ["wpm", "accuracy"])

  const testsTaken = savedTests.length
  const labels = getChartLabels(testsTaken >= 10 ? testsTaken : 16, 16)

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: [0, ...wpm],
        borderColor: defaultChartColors.wpm
      },
      {
        label: "Accuracy",
        data: [100, ...accuracy],
        borderColor: defaultChartColors.accuracy
      }
    ]
  }

  const options: ChartOptions = {
    elements: {
      point: {
        pointStyle: "crossRot",
        borderColor: defaultChartColors.error,
        borderWidth: 2,
        radius: 6
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: { labels: labels },
      y: { max: getHighestYValue([accuracy, wpm]) }
    }
  }

  return (
    <div className="h-full">
      <h2 className="text-lg font-medium text-center">Performance by Number of Tests Taken</h2>
      <Chart data={data} options={options} />
    </div>
  )
}
