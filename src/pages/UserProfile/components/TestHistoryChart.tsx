import { useContext } from "react"
import { FaRegKeyboard } from "react-icons/fa6"
import { IoMdTime } from "react-icons/io"
import { MdOutlineCalendarMonth, MdSpeed } from "react-icons/md"
import { TbTargetArrow } from "react-icons/tb"

import TestHistoryChartRow from "./TestHistoryChartRow"

import { TestManagerContext } from "../../../context/TestManagerContext"

export default function TestHistoryChart() {
  const { savedTests } = useContext(TestManagerContext)

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-sky-600 grid grid-cols-5 gap-1 [&>*]:font-medium [&>*]:p-2">
          <th className="flex items-center justify-center gap-1 mr-3">
            <MdOutlineCalendarMonth />
            <strong>Test Date</strong>
          </th>
          <th className="flex items-center justify-center gap-1 mr-3">
            <IoMdTime />
            <strong>Test Length</strong>
          </th>
          <th className="flex items-center justify-center gap-1 mr-3">
            <MdSpeed />
            <strong>WPM</strong>
          </th>
          <th className="flex items-center justify-center gap-1 mr-3">
            <TbTargetArrow />
            <strong>Accuracy</strong>
          </th>
          <th className="flex items-center justify-center gap-1 mr-3">
            <FaRegKeyboard />
            <strong>Characters</strong>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {savedTests.map((test, i) => (
          <TestHistoryChartRow key={i} test={test} />
        ))}
      </tbody>
    </table>
  )
}
