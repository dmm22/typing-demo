import HiddenInput from "./components/HiddenInput"
import TextDisplay from "./components/TextDisplay"
import useHiddenInput from "./hooks/useHiddenInput"
import useText from "./hooks/useText"

export default function TestPage() {
  const { targetText, updateTargetText, updateTextArray } = useText()
  const { hiddenInputValue, missedSpaceIndex, setHiddenInputValue } = useHiddenInput()

  const handleSetHiddenInputValue = (currentInput: string) => {
    setHiddenInputValue(currentInput, targetText)
  }

  return (
    <main>
      <HiddenInput
        hiddenInputValue={hiddenInputValue}
        handleSetHiddenInputValue={handleSetHiddenInputValue}
      />
      <TextDisplay
        targetText={targetText}
        hiddenInputValue={hiddenInputValue}
        missedSpaceIndex={missedSpaceIndex}
      />
    </main>
  )
}
