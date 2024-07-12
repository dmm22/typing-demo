import { useState, useEffect, useRef } from "react"

const useHiddenInput = () => {
  const [mainInputValue, setMainInputValue] = useState("")
  const [missedSpaceInputValue, setMissedSpaceInputValue] = useState("")

  const previousInputValueRef = useRef("")

  useEffect(() => {
    previousInputValueRef.current = mainInputValue
  }, [mainInputValue])

  const inputHandler = (newInput: string, targetText: string = "") => {
    const typedCharacterIndex = newInput.length - 1
    const typedCharacter = newInput[typedCharacterIndex]
    const expectedCharacter = targetText[typedCharacterIndex]

    const expectedSpaceMissed = expectedCharacter === " " && typedCharacter !== " "
    const unexpectedSpaceTyped = expectedCharacter !== " " && typedCharacter === " "
    const lessCharactersThanPreviousInput = newInput.length < previousInputValueRef.current.length

    if (expectedSpaceMissed) {
      setMissedSpaceInputValue(previousValue => `${previousValue}${typedCharacter}`)
      return
    }

    if (missedSpaceInputValue) {
      handleMissedSpaceInputValue(newInput)
      return
    }

    if (!lessCharactersThanPreviousInput && unexpectedSpaceTyped) {
      skipToNextWord(targetText)
      return
    }

    if (!newInput) setMissedSpaceInputValue("")

    setMainInputValue(newInput)
  }

  const handleMissedSpaceInputValue = (newInput: string) => {
    const typedCharacter = newInput[newInput.length - 1]

    console.log({ newInput, typedCharacter })

    if (typedCharacter === " ") {
      setMissedSpaceInputValue("")
      setMainInputValue(previousInput => `${previousInput} `)
      return
    }

    setMissedSpaceInputValue(newInput)
  }

  const skipToNextWord = (targetText: string) => {
    const remainingText = targetText.slice(mainInputValue.length, targetText.length)
    const charactersUntilNextSpace = remainingText.indexOf(" ") + 1
    const inputPadding = Array(charactersUntilNextSpace).fill(" ").join("")

    setMainInputValue(previousInput => `${previousInput}${inputPadding}`)
  }

  return {
    hiddenInputValue: mainInputValue,
    missedSpaceInputValue,
    setHiddenInputValue: inputHandler
  }
}

export default useHiddenInput
