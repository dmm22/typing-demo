import { useMemo, useRef } from "react"

import Caret from "./Caret"

type TextDisplayProps = {
  targetText: string
  hiddenInputValue: string
  missedSpaceInputValue: string
}

export default function TextDisplay({
  targetText,
  hiddenInputValue,
  missedSpaceInputValue
}: TextDisplayProps) {
  const caretPositionRef = useRef<HTMLSpanElement | null>(null)

  let globalCharacterIndex = 0

  const missedSpaceCharacterIndexes = useMemo(() => {
    return [...missedSpaceInputValue].map((_, characterIndex) => characterIndex + hiddenInputValue.length)
  }, [missedSpaceInputValue])

  const targetTextByWordAndChar = useMemo(() => {
    return targetText.replace(/\s/g, " ¿").split(/¿/g)
  }, [targetText])

  const getCharacterStyles = (character: string, characterIndex: number) => {
    const notTyped = !hiddenInputValue || characterIndex > hiddenInputValue.length - 1
    const incorrectCharacter = hiddenInputValue[characterIndex] !== character

    if (missedSpaceCharacterIndexes.includes(characterIndex)) {
      return "text-red-700"
    }

    if (notTyped) return `text-neutral-500`
    if (incorrectCharacter) return `text-red-400`

    return `text-neutral-400`
  }

  const combinedInputLength = hiddenInputValue.length + missedSpaceInputValue.length

  return (
    <>
      <Caret caretPositionRef={caretPositionRef} hiddenInputValue={hiddenInputValue} />
      <div className="flex flex-wrap gap-3 font-mono text-2xl ">
        {targetTextByWordAndChar.map((word, wordIndex) => (
          <div key={wordIndex} className={`${wordIndex}`}>
            {word.split("").map((character, characterIndex) => {
              const hasCaret = globalCharacterIndex === combinedInputLength
              globalCharacterIndex++

              return (
                <span
                  key={`${wordIndex}-${characterIndex}`}
                  className={getCharacterStyles(character, globalCharacterIndex - 1)}
                >
                  {hasCaret && <span ref={caretPositionRef}></span>}
                  {character}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
