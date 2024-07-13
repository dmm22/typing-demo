import ActivityOverview from "./components/ActivityOverview"
import ProgressChart from "./components/ProgressChart"
import TestHistoryChart from "./components/TestHistoryChart"

export default function UserProfilePage() {
  return (
    <main className="grid gap-8">
      <section className="flex gap-8 [&>*]:separator-outline">
        <aside className="grid items-center p-6 rounded outline outline-1 outline-neutral-300">
          <ActivityOverview />
        </aside>
        <div className="flex-1 p-6 rounded outline outline-1 outline-neutral-300">
          <ProgressChart />
        </div>
      </section>
      <section className="flex-1 p-6 rounded outline outline-1 outline-neutral-300">
        <TestHistoryChart />
      </section>
    </main>
  )
}
