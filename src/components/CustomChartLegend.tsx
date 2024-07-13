import { LegendItem } from "../types"

type CustomChartLegendProps = {
  legendItems: LegendItem[]
}

export default function CustomChartLegend({ legendItems }: CustomChartLegendProps) {
  const renderLegendItem = (item: LegendItem) => {
    if (item.icon) {
      return <div className="flex-shrink-0">{item.icon}</div>
    }
    if (item.color) {
      return <div className="h-5 rounded w-14" style={{ backgroundColor: item.color }}></div>
    }
  }

  return (
    <figure className="flex justify-end gap-6 mb-2">
      {legendItems.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <figcaption className="text-sm">{item.label}</figcaption>
          {renderLegendItem(item)}
        </div>
      ))}
    </figure>
  )
}
