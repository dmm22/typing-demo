import { useContext } from "react"
import { TestManagerContext } from "../../context/TestManagerContext"

export default function TestResultsPage() {
  const { testResults } = useContext(TestManagerContext)
  return (
    <main>
      <pre>{testResults && JSON.stringify(testResults, null, 2)}</pre>
    </main>
  )
}
