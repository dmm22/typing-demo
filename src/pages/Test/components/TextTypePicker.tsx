import { useCallback } from "react"

import CarouselSelect from "../../../components/CarouselSelect"

import { shuffleArray } from "../../../utils/arrayUtils"

import sentences from "../../../data/sentences.json"
import words from "../../../data/words.json"

import { CarouselOption } from "../../../types"
import useLocalStorage from "../../../hooks/useLocalStorage"

type TextTypePickerProps = {
  updateTextArray: (newArray: string[]) => void
}

const textTypes = ["sentences", "words"]

export default function TextTypePicker({ updateTextArray }: TextTypePickerProps) {
  const [textTypeIndex, setTextTypeIndex] = useLocalStorage("textTypeIndex", 0)

  const textTypeOptions = [
    { value: 0, label: "Sentences" },
    { value: 1, label: "Words" }
  ]

  const selectTextType = useCallback((chosenOption: CarouselOption) => {
    const openIndex = +chosenOption.value
    if (isNaN(openIndex)) return

    const textType = textTypes[openIndex]

    if (textType === "words") {
      const wordArray = getWordBlocks()
      updateTextArray(wordArray)
    }

    if (textType === "sentences") {
      const sentenceArray = shuffleArray(sentences)
      updateTextArray(sentenceArray)
    }

    setTextTypeIndex(+chosenOption.value)
  }, [])

  const getWordBlocks = () => {
    const shuffledWords = shuffleArray(words).join(" ")
    const maxCharactersPerBlock = 130

    return shuffledWords.split("").reduce(
      (sentences, char, i) => {
        const currentSentence = sentences[sentences.length - 1] || ""

        const shouldStartNewSentence = currentSentence.length >= maxCharactersPerBlock && char === " "
        const shouldAddCurrentSentence = shouldStartNewSentence && i < shuffledWords.length - 1

        sentences = shouldAddCurrentSentence ? [...sentences, ""] : sentences
        sentences[sentences.length - 1] =
          (sentences[sentences.length - 1] || "") + (shouldStartNewSentence ? "" : char)

        return sentences
      },
      [""]
    )
  }

  return (
    <li>
      <h3 className="mb-1 font-medium text-center">Text Type</h3>
      <CarouselSelect
        optionsList={textTypeOptions}
        currentOptionIndex={textTypeIndex}
        selectOption={selectTextType}
      />
    </li>
  )
}
