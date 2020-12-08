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
  console.log(location)
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
  const iconOptions: L.BaseIconOptions = {
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }

  const personIcon = new L.Icon(iconOptions)

  return (
    <Leaflet.Map className="z-inherit vh-50" center={[location.lat, location.lng]} zoom={19}>
      <Leaflet.TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Leaflet.Marker icon={personIcon} position={[location.lat, location.lng]}>
        <Leaflet.Popup>You are here!</Leaflet.Popup>
      </Leaflet.Marker>
      {artworks.map(art => {
        iconOptions.iconUrl = art.seen
          ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'
          : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'
        return (
          <Leaflet.Marker icon={new L.Icon(iconOptions)} position={[art.location.lat, art.location.lng]} key={art.id}>
            <Leaflet.Popup>{art.name}</Leaflet.Popup>
          </Leaflet.Marker>
        )
      })}
    </Leaflet.Map>
  )
}
