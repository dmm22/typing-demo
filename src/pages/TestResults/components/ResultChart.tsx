import { useContext } from "react"
import { ChartDataset, ChartOptions } from "chart.js"

import Chart from "../../../components/Chart"

import { TestManagerContext } from "../../../context/TestManagerContext"

import { getChartLabels, getHighestYValue } from "../../../utils/chartUtils"
import { formatSecondsAsMMSS } from "../../../utils/formattingUtils"

import { defaultChartColors } from "../../../config/chartConfig"

export default function ResultChart() {
  const { testChartData } = useContext(TestManagerContext)

  if (!testChartData) return <div>Loading Chart...</div>

  const { wpm, accuracy, errors } = testChartData

  const testDuration = wpm.length
  const labels = getChartLabels(testDuration, 15, formatSecondsAsMMSS)

  const errorDataCoordinates = accuracy.map((accuracyYPosition, i) => {
    const hasErrorKeys = errors[i]
    return hasErrorKeys ? accuracyYPosition : null
  })

  const transparent = "rgba(0, 0, 0, 0)"

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: wpm,
        borderColor: defaultChartColors.wpm,
        pointBackgroundColor: transparent,
        pointBorderColor: transparent
      },
      {
        label: "Accuracy",
        data: accuracy,
        borderColor: defaultChartColors.accuracy,
        pointBackgroundColor: transparent,
        pointBorderColor: transparent
      },
      {
        type: "scatter",
        label: "Error",
        backgroundColor: defaultChartColors.error,
        data: errorDataCoordinates
      }
    ] as ChartDataset[]
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
    <div className="h-[46dvh]">
      <Chart data={data} options={options} />
    </div>
  )
}
