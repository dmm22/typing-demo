import { useContext } from "react"

import { TestManagerContext } from "../../../context/TestManagerContext"

import { formatSecondsAsMMSS } from "../../../utils/formattingUtils"

export default function StatPanel() {
  const { testResults } = useContext(TestManagerContext)

  if (!testResults) return <div>Awaiting results...</div>

  const { testDuration, wpm, accuracy } = testResults

  return (
    <section className="flex justify-center gap-24 [&>*>*]: text-center">
      <div className="flex flex-col">
        <h4 className="font-light">Test Length:</h4>
        <span className="text-4xl font-medium">{formatSecondsAsMMSS(testDuration)}</span>
      </div>
      <div className="flex flex-col">
        <h4 className="font-light">Accuracy</h4>
        <span className="text-4xl font-medium">{accuracy}%</span>
      </div>
      <div className="flex flex-col">
        <h4 className="font-light">Speed</h4>
        <span className="text-4xl font-medium">{wpm} WPM</span>
      </div>
    </section>
  )
}
