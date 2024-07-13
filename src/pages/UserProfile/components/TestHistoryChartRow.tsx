import { formatRelativeDate, formatSecondsAsFullWords } from "../../../utils/formattingUtils"

import { SavedTest } from "../../../types"

type TestHistoryChartRowProps = {
  test: SavedTest
}

export default function TestHistoryChartRow({ test }: TestHistoryChartRowProps) {
  const { date, testDuration, wpm, accuracy, totalKeystrokes, correctKeystrokes } = test

  return (
    <tr className="grid grid-cols-5 gap-1 [&>*]:p-2">
      <td className="text-center">{formatRelativeDate(new Date(date))}</td>
      <td className="text-center">{formatSecondsAsFullWords(testDuration)}</td>
      <td className="text-center">{wpm}</td>
      <td className="text-center">{`${accuracy}%`}</td>
      <td className="text-center">{`${correctKeystrokes}/${totalKeystrokes}`}</td>
    </tr>
  )
}
