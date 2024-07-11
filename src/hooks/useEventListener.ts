import { useEffect, useRef } from "react"

type EventHandler<TEvent extends Event> = (event: TEvent) => void

const useEventListener = <TEvent extends Event>(
  eventType: keyof WindowEventMap,
  callback: EventHandler<TEvent>,
  element: Window = window
) => {
  const callbackRef = useRef<EventHandler<TEvent>>(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (event: Event) => callbackRef.current(event as TEvent)

    element.addEventListener(eventType as keyof WindowEventMap, handler as EventListener)
    return () => {
      element.removeEventListener(eventType as keyof WindowEventMap, handler as EventListener)
    }
  }, [eventType, element])
}

export default useEventListener
