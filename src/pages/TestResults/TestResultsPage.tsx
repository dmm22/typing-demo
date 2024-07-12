import ResultChart from "./components/ResultChart"
import StatPanel from "./components/StatPanel"

export default function TestResultsPage() {
  return (
    <main className="grid gap-8">
      <StatPanel />
      <ResultChart />
    </main>
  )
}
