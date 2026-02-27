'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const TYPE_INTERVAL_MS = 88
const DELETE_INTERVAL_MS = 52
const WORD_PAUSE_MS = 1800

type TypewriterWordProps = {
  words: string[]
}

export function TypewriterWord({ words }: TypewriterWordProps) {
  const safeWords = useMemo(() => (words.length > 0 ? words : ['']), [words])
  const [displayWord, setDisplayWord] = useState(safeWords[0] ?? '')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const frameRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const lastFrameRef = useRef(0)
  const phaseRef = useRef<'typing' | 'deleting'>('typing')

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setPrefersReducedMotion(query.matches)
    }

    syncPreference()
    query.addEventListener('change', syncPreference)

    return () => {
      query.removeEventListener('change', syncPreference)
    }
  }, [])

  useEffect(() => {
    const clearScheduled = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    clearScheduled()

    if (prefersReducedMotion) {
      setDisplayWord(safeWords[0] ?? '')
      return clearScheduled
    }

    wordIndexRef.current = 0
    charIndexRef.current = 0
    lastFrameRef.current = 0
    phaseRef.current = 'typing'
    setDisplayWord('')

    const tick = (timestamp: number) => {
      if (lastFrameRef.current === 0) {
        lastFrameRef.current = timestamp
      }

      const interval = phaseRef.current === 'typing' ? TYPE_INTERVAL_MS : DELETE_INTERVAL_MS

      if (timestamp - lastFrameRef.current >= interval) {
        lastFrameRef.current = timestamp
        const currentWord = safeWords[wordIndexRef.current] ?? ''

        if (phaseRef.current === 'typing') {
          const nextCharCount = Math.min(charIndexRef.current + 1, currentWord.length)
          charIndexRef.current = nextCharCount
          setDisplayWord(currentWord.slice(0, nextCharCount))

          if (nextCharCount >= currentWord.length) {
            timeoutRef.current = window.setTimeout(() => {
              phaseRef.current = 'deleting'
              lastFrameRef.current = 0
              frameRef.current = window.requestAnimationFrame(tick)
            }, WORD_PAUSE_MS)
            return
          }
        } else {
          const nextCharCount = Math.max(charIndexRef.current - 1, 0)
          charIndexRef.current = nextCharCount
          setDisplayWord(currentWord.slice(0, nextCharCount))

          if (nextCharCount === 0) {
            wordIndexRef.current = (wordIndexRef.current + 1) % safeWords.length
            phaseRef.current = 'typing'
          }
        }
      }

      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)

    return clearScheduled
  }, [prefersReducedMotion, safeWords])

  return (
    <span className="typewriter-word">
      <span className="typewriter-word__text">{displayWord}</span>
      <span className="typewriter-word__cursor" aria-hidden="true">
        |
      </span>
    </span>
  )
}
