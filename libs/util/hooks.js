import { useState, useEffect, useRef, useCallback } from 'react'
import { useMemoOne } from 'use-memo-one'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useBoundingClientRect = (debouncePeriod = 100) => {
  const [rect, setRect] = useState(undefined)
  const ref = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect()
        if (JSON.stringify(boundingRect) !== JSON.stringify(rect)) {
          setRect(JSON.parse(JSON.stringify(boundingRect)))
        }
      }
    }, debouncePeriod)
    return () => {
      clearInterval(interval)
    }
  }, [rect])

  return [rect, ref]
}

export const useRefRect = (debouncePeriod = 100) => {
  const [rect, setRect] = useState(undefined)
  const ref = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        const boundingRect = ref.current.getBoundingClientRect()
        const newRect = {
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft,
          width: boundingRect.width,
          height: boundingRect.height,
        }
        if (JSON.stringify(newRect) !== JSON.stringify(rect)) {
          setRect(JSON.parse(JSON.stringify(newRect)))
        }
      }
    }, debouncePeriod)
    return () => {
      clearInterval(interval)
    }
  }, [rect])

  return [rect, ref]
}

export const useRefs = () => {
  const map = useMemoOne(() => new Map(), [])

  const setRef = useCallback(
    index => element => {
      if (element === null) map.has(index) && map.delete(index)
      else map.set(index, element)
    },
    [map]
  )
  const getRef = useCallback(index => ({ current: map.get(index) }), [map])

  return [getRef, setRef]
}

export const usePerm = callback => useMemoOne(callback, [])

export const useInteractiveClick = (handler) => {
  return useMemoOne(() => {
    return {
      onClick: (e, ...args) => {
        e.stopPropagation()
        e.preventDefault()
        handler.apply(null, [e, ...args])
      },
      onKeyDown: (e, ...args) => {
        if (e.keyCode === 13) {
          e.stopPropagation()
          e.preventDefault()
          handler.apply(null, [e, ...args])
        }
      },
    }
  }, [handler])
}
