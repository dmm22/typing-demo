import ActivityOverview from "./components/ActivityOverview"
import ProgressChart from "./components/ProgressChart"

export default function UserProfilePage() {
  return (
    <main>
      <section className="flex gap-8 [&>*]:separator-outline">
        <aside className="grid items-center p-6 rounded outline outline-1 outline-neutral-300">
          <ActivityOverview />
        </aside>
        <div className="flex-1 p-6 rounded outline outline-1 outline-neutral-300">
          <ProgressChart />
        </div>
      </section>
    </main>
  )
}
