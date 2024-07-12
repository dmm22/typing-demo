import { useContext } from "react"
import { FaUser } from "react-icons/fa"
import { TestManagerContext } from "../../../context/TestManagerContext"
import { formatLongDate } from "../../../utils/formattingUtils"

export default function ActivityOverview() {
  const { savedTestSummary } = useContext(TestManagerContext)
  const { joinDate, totalKeystrokes, testCount, averageWpm, averageAccuracy } = savedTestSummary

  return (
    <section className="flex flex-col items-start justify-center h-full gap-6">
      <header className="flex flex-col items-center gap-3">
        <div>
          <FaUser className="p-2 text-6xl text-white rounded-full bg-neutral-600" aria-hidden="true" />
          <h1 className="mb-1 text-xl font-semibold">Guest</h1>
        </div>
        <div className="flex gap-14 w-max" aria-labelledby="performance-metrics">
          <h2 id="performance-metrics" className="sr-only">
            Performance Metrics
          </h2>
          <div className="flex flex-col items-center flex-1">
            <p className="text-sm text-neutral-500">WPM</p>
            <p className="text-lg font-medium">{averageWpm}</p>
          </div>
          <div className="flex flex-col items-center flex-1">
            <p className="text-sm text-neutral-500">Accuracy</p>
            <p className="text-lg font-medium">{averageAccuracy}</p>
          </div>
        </div>
      </header>
      <footer className="flex flex-col gap-1">
        <small className="text-neutral-500">
          Joined:{" "}
          <span className="font-medium text-sky-600">
            {joinDate === "N/A" ? "N/A" : formatLongDate(joinDate as Date)}
          </span>
        </small>
        <small className="text-neutral-500">
          Characters Typed: <span className="font-medium text-sky-600">{totalKeystrokes}</span>
        </small>
        <small className="text-neutral-500">
          Tests Taken: <span className="font-medium text-sky-600">{testCount}</span>
        </small>
      </footer>
    </section>
  )
}
