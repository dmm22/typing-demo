import { useContext } from "react"

import ActivityOverview from "./components/ActivityOverview"
import ProgressChart from "./components/ProgressChart"
import TestHistoryChart from "./components/TestHistoryChart"

import { TestManagerContext } from "../../context/TestManagerContext"

export default function UserProfilePage() {
  const { savedTests } = useContext(TestManagerContext)

  return (
    <main className="grid gap-8">
      <section className="flex gap-8 [&>*]:separator-outline">
        <aside className="grid items-center p-6 rounded outline outline-1 outline-neutral-300">
          <ActivityOverview />
        </aside>
        <div className="relative flex-1 p-6 rounded outline outline-1 outline-neutral-300">
          {savedTests.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <h2 className="mt-8 text-2xl leading-tight bg-white text-neutral-500">
                No data yet? Take your first typing test and watch your progress unfold!
              </h2>
              <button className="px-3 py-1.5 text-lg font-medium text-white bg-orange-500 rounded">
                Let's Go!
              </button>
            </div>
          )}
          <ProgressChart />
        </div>
      </section>
      <section className="flex-1 p-6 rounded outline outline-1 outline-neutral-300">
        <TestHistoryChart />
      </section>
    </main>
  )
}
