import { useContext } from "react"

import { formatSecondsAsMMSS } from "../../../utils/formattingUtils"
import { TestManagerContext } from "../../../context/TestManagerContext"

export default function TestTimer() {
  const { timer } = useContext(TestManagerContext)
  return <time className="text-5xl font-medium">{formatSecondsAsMMSS(timer)}</time>
}
