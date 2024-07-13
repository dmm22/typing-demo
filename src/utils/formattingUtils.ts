export const formatSecondsAsMMSS = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export const formatSecondsAsFullWords = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  const minuteString = minutes === 1 ? "1 Minute" : minutes > 1 ? `${minutes} Minutes` : ""
  const secondString = seconds === 1 ? "1 Second" : seconds > 1 ? `${seconds} Seconds` : ""

  return `${minuteString}${minuteString && secondString ? " " : ""}${secondString}`.trim()
}

export const formatLongDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

export const formatRelativeDate = (date: Date): string => {
  const now = new Date()
  const dateDifference = now.getTime() - date.getTime()
  const seconds = Math.floor(dateDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = now.getFullYear() - date.getFullYear()

  if (days < 1 && hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  if (days < 1 && minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  if (days < 1 && seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`
  if (years < 1) return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })

  return date.getFullYear().toString()
}
