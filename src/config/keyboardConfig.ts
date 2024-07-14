import { KeyboardKey } from "../types"

export const defaultKeyboardColors = {
  mainKeyColor: "bg-stone-50",
  accentKeyColor: "bg-stone-200",
  keyboardBaseColor: "bg-stone-100",
  keyAndKeyboardOutlineColor: "outline-stone-300",
  keyHighlightColor: "bg-sky-400 text-white"
}

const row1 = [
  { mainKey: "`", shiftKey: "~" },
  { mainKey: "1", shiftKey: "!" },
  { mainKey: "2", shiftKey: "@" },
  { mainKey: "3", shiftKey: "#" },
  { mainKey: "4", shiftKey: "$" },
  { mainKey: "5", shiftKey: "%" },
  { mainKey: "6", shiftKey: "^" },
  { mainKey: "7", shiftKey: "&" },
  { mainKey: "8", shiftKey: "*" },
  { mainKey: "9", shiftKey: "(" },
  { mainKey: "0", shiftKey: ")" },
  { mainKey: "-", shiftKey: "_" },
  { mainKey: "=", shiftKey: "+" },
  { mainKey: "Backspace" }
]

const row2 = [
  { mainKey: "Tab" },
  { mainKey: "Q" },
  { mainKey: "W" },
  { mainKey: "E" },
  { mainKey: "R" },
  { mainKey: "T" },
  { mainKey: "Y" },
  { mainKey: "U" },
  { mainKey: "I" },
  { mainKey: "O" },
  { mainKey: "P" },
  { mainKey: "[", shiftKey: "{" },
  { mainKey: "]", shiftKey: "}" },
  { mainKey: "\\", shiftKey: "|" }
]

const row3 = [
  { mainKey: "CapsLock" },
  { mainKey: "A" },
  { mainKey: "S" },
  { mainKey: "D" },
  { mainKey: "F" },
  { mainKey: "G" },
  { mainKey: "H" },
  { mainKey: "J" },
  { mainKey: "K" },
  { mainKey: "L" },
  { mainKey: ";", shiftKey: ":" },
  { mainKey: "'", shiftKey: '"' },
  { mainKey: "Enter" }
]

const row4 = [
  { mainKey: "ShiftLeft" },
  { mainKey: "Z" },
  { mainKey: "X" },
  { mainKey: "C" },
  { mainKey: "V" },
  { mainKey: "B" },
  { mainKey: "N" },
  { mainKey: "M" },
  { mainKey: ",", shiftKey: "<" },
  { mainKey: ".", shiftKey: ">" },
  { mainKey: "/", shiftKey: "?" },
  { mainKey: "ShiftRight" }
]

const row5 = [
  {
    mainKey: "ControlLeft"
  },
  {
    mainKey: "MetaLeft"
  },
  { mainKey: "AltLeft" },
  { mainKey: "Space" },
  { mainKey: "AltRight" },
  {
    mainKey: "MetaRight"
  },
  { mainKey: "Fn" },
  {
    mainKey: "ControlRight"
  }
]

export const defaultKeyboardLayout = [row1, row2, row3, row4, row5] as KeyboardKey[][]
