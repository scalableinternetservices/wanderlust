import type * as LT from 'leaflet'
import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as ReactLT from 'react-leaflet'
import { ArtworkProps as Artwork } from '../artwork/ArtworkProps'

interface MapProps {
  getLocation: () => { lat: number; lng: number } | null
  updateLocation: (lat: number, lng: number) => void
  artworks: Artwork[]
}

export function Map({ getLocation, updateLocation, artworks }: MapProps) {
  let Leaflet: typeof ReactLT | undefined = undefined
  let L: typeof LT | undefined = undefined

  if (typeof window !== 'undefined') {
    Leaflet = require('react-leaflet')
    L = require('leaflet')
  }
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(c => {
      updateLocation(c.coords.latitude, c.coords.longitude)
    })
  }

  const location = getLocation()

  if (!location || !Leaflet || !L) return <div>Please enable location services!</div>
  return <ClientMap Leaflet={Leaflet} L={L} location={location} artworks={artworks} />
}

interface ClientMapProps {
  Leaflet: typeof ReactLT
  L: typeof LT
  location: { lat: number; lng: number }
  artworks: Artwork[]
}

function ClientMap({ Leaflet, L, location, artworks }: ClientMapProps) {
  // custom icon setup
  const iconOptions: L.BaseIconOptions = {
    iconUrl: 'https://github.com/scalableinternetservices/wanderlust/blob/master/public/imgs/map-icon.png?raw=true',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [4, 0],
  }
  const personIcon = new L.Icon(iconOptions)

  return (
    <Leaflet.Map className="z-inherit vh-50" center={[location.lat, location.lng]} zoom={19}>
      <Leaflet.TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {artworks.map(art => {
        if (art.seen) {
          iconOptions.iconUrl =
            'https://github.com/scalableinternetservices/wanderlust/blob/master/public/imgs/purple-star.png?raw=true'
        } else {
          iconOptions.iconUrl =
            'https://github.com/scalableinternetservices/wanderlust/blob/master/public/imgs/gray-star.png?raw=true'
        }
        iconOptions.iconSize = [41, 41]
        iconOptions.popupAnchor = [8, 0]

        return (
          <Leaflet.Marker icon={new L.Icon(iconOptions)} position={[art.location.lat, art.location.lng]} key={art.id}>
            <Leaflet.Popup>{art.name}</Leaflet.Popup>
          </Leaflet.Marker>
        )
      })}
      <Leaflet.Marker icon={personIcon} position={[location.lat, location.lng]}>
        <Leaflet.Popup>You are here!</Leaflet.Popup>
      </Leaflet.Marker>
    </Leaflet.Map>
  )
}
