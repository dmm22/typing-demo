import { useCallback, useContext, useMemo } from "react"

import CarouselSelect from "../../../components/CarouselSelect"

import { TestManagerContext } from "../../../context/TestManagerContext"

import { formatSecondsAsFullWords } from "../../../utils/formattingUtils"
import { defaultTestDurations } from "../../../config/testConfig"

import { CarouselOption } from "../../../types"

export default function TestDurationPicker() {
  const { testDuration, setTestDuration } = useContext(TestManagerContext)

  const durationOptions = useMemo(
    () =>
      defaultTestDurations.map(duration => ({
        value: duration,
        label: formatSecondsAsFullWords(duration)
      })),
    [testDuration]
  )

  const currentDurationIndex = defaultTestDurations.indexOf(testDuration)

  const selectTestDuration = useCallback((chosenOption: CarouselOption) => {
    setTestDuration(+chosenOption.value)
  }, [])

  return (
    <li>
      <h3 className="mb-1 font-medium text-center">Test Duration</h3>
      <CarouselSelect
        optionsList={durationOptions}
        currentOptionIndex={currentDurationIndex}
        selectOption={selectTestDuration}
      />
    </li>
  )
}
