import { ChartDataset, ChartOptions } from "chart.js"

export const defaultChartColors = {
  accuracy: "#fb923c",
  wpm: "#0284c7",
  error: "#ef4444",
  grid: "#e5e5e5"
} as const

export const defaultLineDatasetOptions: Partial<ChartDataset<"line">> = {
  type: "line",
  borderWidth: 2,
  fill: false,
  tension: 0.4
}

export const defaultOptions: ChartOptions = {
  font: {
    family: "'ui-sans-serif'"
  },
  maintainAspectRatio: false,
  interaction: {
    mode: "nearest",
    intersect: false
  },
  plugins: {
    legend: {
      align: "end",
      labels: {
        boxWidth: 50,
        boxHeight: 15,
        font: { weight: "bold" }
      }
    }
  },
  scales: {
    x: {
      type: "category",
      ticks: { padding: 8 },
      grid: {
        drawTicks: false,
        color: defaultChartColors.grid
      }
    },
    y: {
      ticks: { padding: 8 },
      grid: {
        drawTicks: false,
        color: defaultChartColors.grid
      }
    }
  }
}
