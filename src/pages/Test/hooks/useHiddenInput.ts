import { useCallback, useState } from "react"

const useHiddenInput = () => {
  const [hiddenInputValue, setHiddenInputValue] = useState("")
  const [missedSpaceIndex, setMissedSpaceIndex] = useState<number | null>(null)

  const updateHiddenInput = useCallback(
    (currentInput: string, targetText?: string) => {
      if (!targetText) {
        setHiddenInputValue(currentInput)
        return
      }

      const typedCharacterIndex = currentInput.length - 1
      const typedCharacter = currentInput[typedCharacterIndex]
      const expectedCharacter = targetText[typedCharacterIndex]

      const expectedSpaceMissed = expectedCharacter === " " && typedCharacter !== " "
      const expectedSpaceCorrected = missedSpaceIndex && expectedCharacter === " " && typedCharacter === " "
      const unexpectedSpaceTyped = typedCharacter === " " && expectedCharacter !== " "

      if (unexpectedSpaceTyped) {
        handleUnexpectedSpace(currentInput, targetText, typedCharacterIndex)
        return
      }

      if (!missedSpaceIndex && expectedSpaceMissed) setMissedSpaceIndex(typedCharacterIndex)
      if (expectedSpaceCorrected) setMissedSpaceIndex(null)

      setHiddenInputValue(currentInput)
    },
    [hiddenInputValue]
  )

  const handleUnexpectedSpace = useCallback(
    (currentInput: string, targetText: string, typedCharacterIndex: number) => {
      const remainingTextAfterSpace = targetText.slice(typedCharacterIndex)
      const nextWordSegment = remainingTextAfterSpace.split(" ")[0]

      setHiddenInputValue(currentInput + " ".repeat(nextWordSegment.length))
    },
    [hiddenInputValue]
  )

  return { hiddenInputValue, missedSpaceIndex, setHiddenInputValue: updateHiddenInput }
}

export default useHiddenInput
