import * as React from 'react'

interface ShareProps {
  getLocation: () => { lat: number; lng: number } | null
  setLocation: (lat: number, lng: number) => void
}

export function Share({ getLocation, setLocation }: ShareProps) {
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(c => {
      setLocation(c.coords.latitude, c.coords.longitude)
    })
  }

  const location = getLocation()

  if (!location) return <div>Please enable location services!</div>
  return <div></div>
}
