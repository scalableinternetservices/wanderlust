import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as LT from 'react-leaflet'
import { Artwork } from '../page/MapPage'

interface MapProps {
  getLocation: () => { lat: number; lng: number } | null
  updateLocation: (lat: number, lng: number) => void
  artworks: Artwork[]
}

export function Map({ getLocation, updateLocation, artworks }: MapProps) {
  let Leaflet: typeof LT | undefined = undefined

  if (typeof window !== 'undefined') {
    Leaflet = require('react-leaflet')
  }
  if (typeof navigator !== 'undefined') {
    navigator.geolocation.getCurrentPosition(c => {
      updateLocation(c.coords.latitude, c.coords.longitude)
    })
  }

  const location = getLocation()
  if (!location || !Leaflet) return <div>Please enable location services!</div>
  return <ClientMap Leaflet={Leaflet} location={location} artworks={artworks} />
}

interface ClientMapProps {
  Leaflet: typeof LT
  location: { lat: number; lng: number }
  artworks: Artwork[]
}

function ClientMap({ Leaflet, location, artworks }: ClientMapProps) {
  return (
    <Leaflet.Map className="z-inherit vh-50" center={[location.lat, location.lng]} zoom={19}>
      <Leaflet.TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Leaflet.Marker position={[location.lat, location.lng]}>
        <Leaflet.Popup>You are here!</Leaflet.Popup>
      </Leaflet.Marker>
      {artworks.map(art => (
        <Leaflet.Marker position={[art.location.lat, art.location.lng]} key={art.id}>
          <Leaflet.Popup>{art.name}</Leaflet.Popup>
        </Leaflet.Marker>
      ))}
    </Leaflet.Map>
  )
}
