import { useRef } from "react"

type TextDisplayProps = {
  targetText: string
  hiddenInputValue: string
  missedSpaceIndex: number | null
}

export default function TextDisplay({ targetText, hiddenInputValue, missedSpaceIndex }: TextDisplayProps) {
  const caretPositionRef = useRef<HTMLSpanElement | null>(null)

  let globalCharacterIndex = 0

  const getTextWithSpaceErrors = () => {
    if (!missedSpaceIndex) return targetText

    const incorrectCharactersSinceMissedSpace = hiddenInputValue.slice(
      missedSpaceIndex - 1,
      hiddenInputValue.length - 1
    )

    return Array.from(targetText, (character, characterIndex) => {
      if (characterIndex === missedSpaceIndex) return `${incorrectCharactersSinceMissedSpace}${character}`
      return character
    }).join("")
  }

  const currentText = missedSpaceIndex ? getTextWithSpaceErrors() : targetText

  const targetTextByWordAndChar = currentText.replace(/\s/g, " ¿").split(/¿/g)

  const getCharacterStyles = (character: string, characterIndex: number) => {
    const notTyped = !hiddenInputValue || characterIndex > hiddenInputValue.length - 1
    const incorrectCharacter = hiddenInputValue[characterIndex] !== character

    if (notTyped) return `text-neutral-800`
    if (incorrectCharacter) return `text-red-400`
    return `text-neutral-400`
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 font-mono text-2xl ">
        {targetTextByWordAndChar.map((word, wordIndex) => (
          <div key={wordIndex} className={`${wordIndex}`}>
            {word.split("").map((character, characterIndex) => {
              const hasCaret = globalCharacterIndex === hiddenInputValue.length

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
