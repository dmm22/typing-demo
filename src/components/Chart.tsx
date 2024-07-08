import deepmerge from "deepmerge"
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js"
import { Chart as ReactChart } from "react-chartjs-2"

import { defaultLineDatasetOptions, defaultOptions } from "../config/chartConfig"

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  Title
)

type ChartProps = {
  options: ChartOptions
  data: ChartData
}

export default function Chart({ options, data }: ChartProps) {
  const datasets = data.datasets.map(set => {
    return set.type === "line" ? { ...set, ...defaultLineDatasetOptions } : set
  }) as ChartDataset[]

  const chartData = {
    labels: data.labels,
    datasets
  }

  const chartOptions = deepmerge(defaultOptions, options)

  return (
    <div className="h-full -m-3.5">
      <ReactChart type="line" data={chartData} options={chartOptions} />
    </div>
  )
}
