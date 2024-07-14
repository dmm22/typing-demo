import { useState } from "react"

import useEventListener from "../../../hooks/useEventListener"

import { defaultKeyboardColors, defaultKeyboardLayout } from "../../../config/keyboardConfig"

export default function InteractiveKeyboardMockup() {
  const [pressedKeyCodes, setPressedKeyCodes] = useState<Set<string>>(new Set())

  const {
    mainKeyColor,
    accentKeyColor,
    keyboardBaseColor,
    keyAndKeyboardOutlineColor,
    keyHighlightColor
  } = defaultKeyboardColors

  useEventListener("keydown", (e: KeyboardEvent) => {
    setPressedKeyCodes(prevKeys => {
      const newKeys = new Set(prevKeys)
      if (e.key.length === 1) newKeys.add(e.key.toUpperCase())
      else newKeys.add(e.code)

      return newKeys
    })
  })

  useEventListener("keyup", (e: KeyboardEvent) => {
    setPressedKeyCodes(prevKeys => {
      const newKeys = new Set(prevKeys)

      if (e.key.length === 1) newKeys.delete(e.key.toUpperCase())
      else newKeys.delete(e.code)

      return newKeys
    })
  })

  const getKeyClasses = (mainKey: string, shiftKey?: string) => {
    let baseClasses = "h-[5dvh] px-2 pt-0.5 rounded text-center shadow-inner"

    const isAccentKey = (mainKey.length > 1 && mainKey !== "Space") || /(`|\\)/.test(mainKey)
    const keyPressed = pressedKeyCodes.has(mainKey) || (shiftKey && pressedKeyCodes.has(shiftKey))
    const keyColor = isAccentKey ? accentKeyColor : mainKeyColor

    baseClasses = `${baseClasses} ${keyPressed ? keyHighlightColor : `${keyColor}`}`

    const oneCharExcludingForwardSlash = mainKey !== "\\" && mainKey.length === 1
    const isSquareKey = oneCharExcludingForwardSlash || /Alt/.test(mainKey)
    if (isSquareKey) return `${baseClasses} aspect-square`

    const shouldFillRemainingSpace = /(Tab|\\|Caps|Enter|Shift|Space)/.test(mainKey)
    if (shouldFillRemainingSpace) return `${baseClasses} flex-1`

    return `${baseClasses} w-max px-2`
  }

  return (
    <div
      className={`rounded-lg p-1 w-max ${keyboardBaseColor} outline outline-2 ${keyAndKeyboardOutlineColor}`}
    >
      <div
        className={`flex flex-col gap-0.5 w-max rounded bg-neutral-600 outline outline-1 ${keyAndKeyboardOutlineColor}`}
      >
        {defaultKeyboardLayout.map((row, rowIndex) => {
          return (
            <div className="flex gap-0.5" key={`row-${rowIndex}`}>
              {row.map(({ mainKey, shiftKey }, keyIndex) => {
                const keyName = /Meta/.test(mainKey) ? "Cmd" : mainKey
                const displayText = shiftKey ? `${keyName} ${shiftKey}` : keyName

                return (
                  <span
                    key={`key-${rowIndex}-${keyIndex}`}
                    className={getKeyClasses(mainKey, shiftKey)}
                  >
                    {displayText.replace(/(Left|Right|Lock)/, "")}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
