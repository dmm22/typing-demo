import { useCallback } from "react"

import { CarouselOption } from "../types"

type CarouselSelectProps = {
  optionsList: CarouselOption[]
  currentOptionIndex: number
  selectOption: (chosenOption: CarouselOption) => void
}

export default function CarouselSelect({
  optionsList,
  currentOptionIndex,
  selectOption
}: CarouselSelectProps) {
  const gotoPreviousOption = useCallback(() => {
    selectOption(optionsList[(currentOptionIndex - 1 + optionsList.length) % optionsList.length])
  }, [currentOptionIndex, optionsList, selectOption])

  const gotoNextOption = useCallback(() => {
    selectOption(optionsList[(currentOptionIndex + 1) % optionsList.length])
  }, [currentOptionIndex, optionsList, selectOption])

  const currentOptionLabel = optionsList[currentOptionIndex].label

  return (
    <div className="flex items-center p-1 rounded-md w-36 outline outline-1 outline-neutral-100">
      <button className="text-lg -rotate-90 text-sky-600" onClick={gotoPreviousOption}>
        ▲
      </button>
      <span className="flex-1 inline-block text-center">{currentOptionLabel}</span>
      <button className="text-lg -rotate-90 text-sky-600" onClick={gotoNextOption}>
        ▼
      </button>
    </div>
  )
}
