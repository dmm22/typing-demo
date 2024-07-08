import HiddenInput from "./components/HiddenInput"
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
      <p>{hiddenInputValue}</p>
      <p>{targetText}</p>
    </main>
  )
}
