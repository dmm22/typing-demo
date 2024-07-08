import { useEffect, useRef } from "react"

type EventHandler = (event: Event) => void

const useEventListener = (eventType: string, callback: EventHandler, element: EventTarget = window) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!element) return

    const handler: EventHandler = event => callbackRef.current(event)
    element.addEventListener(eventType, handler)
    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

export default useEventListener
