import { useContext } from "react"
import { ChartDataset, ChartOptions } from "chart.js"

import Chart from "../../../components/Chart"

import { TestManagerContext } from "../../../context/TestManagerContext"

import { getChartLabels, getHighestYValue } from "../../../utils/chartUtils"
import { formatSecondsAsMMSS } from "../../../utils/formattingUtils"

import { defaultChartColors } from "../../../config/chartConfig"
import { LegendItem } from "../../../types"
import CustomChartLegend from "../../../components/CustomChartLegend"

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

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: wpm,
        borderColor: defaultChartColors.wpm,
        pointBorderColor: "rgba(0, 0, 0, 0)"
      },
      {
        label: "Accuracy",
        data: accuracy,
        borderColor: defaultChartColors.accuracy,
        pointBorderColor: "rgba(0, 0, 0, 0)"
      },
      {
        type: "scatter",
        label: "Errors",
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
      },
      tooltip: {
        callbacks: {
          title: context => {
            context.forEach(el => (el.label = `Time Elapsed: ${el.label}`))
          },
          label: context => {
            if (context.dataset.label === "Accuracy") {
              context.formattedValue = `${context.formattedValue}%`
            }
            if (context.dataset.label === "Errors") {
              console.log(context)
              console.log(errors)
              context.formattedValue = errors[context.dataIndex]
            }
          },
          labelColor: context => {
            if (context.dataset.label === "Accuracy") {
              return {
                borderColor: defaultChartColors.accuracy,
                backgroundColor: defaultChartColors.accuracy
              }
            }

            if (context.dataset.label === "WPM") {
              return {
                borderColor: defaultChartColors.wpm,
                backgroundColor: defaultChartColors.wpm
              }
            }
          }
        }
      }
    },
    scales: {
      x: { labels: labels },
      y: { max: getHighestYValue([accuracy, wpm]) }
    }
  }

  const legendItems: LegendItem[] = [
    { label: "WPM", color: defaultChartColors["wpm"] },
    { label: "Accuracy", color: defaultChartColors["accuracy"] },
    {
      label: "Errors",
      icon: <span className="text-xl font-black leading-tight text-red-500">✕</span>
    }
  ]

  return (
    <div className="h-[46dvh]">
      <div className="mr-2">
        <CustomChartLegend legendItems={legendItems} />
      </div>
      <Chart data={data} options={options} />
    </div>
  )
}
