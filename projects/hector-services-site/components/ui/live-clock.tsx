'use client'

import { useEffect, useState } from 'react'

type ClockState = {
  isoString: string
  timeString: string
}

function getClockState(): ClockState {
  const now = new Date()

  return {
    isoString: now.toISOString(),
    timeString: now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
}

export function LiveClock() {
  const [clockState, setClockState] = useState<ClockState>(() => getClockState())

  useEffect(() => {
    const updateClock = () => {
      setClockState(getClockState())
    }

    updateClock()
    const intervalId = window.setInterval(updateClock, 60_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <time className="hero-live-clock" dateTime={clockState.isoString}>
      {clockState.timeString}
    </time>
  )
}
