import { useQuery } from '@apollo/client'
import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as LT from 'react-leaflet'
import { FetchNearbyMap, FetchNearbyMapVariables } from '../../graphql/query.gen'
import { fetchMap } from './fetchMap'

export function Map() {
  let Leaflet: typeof LT | undefined = undefined
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  if (typeof window !== 'undefined') {
    Leaflet = require('react-leaflet')
  }
  if (typeof navigator !== 'undefined') {
    navigator.geolocation.getCurrentPosition(c => setLocation({ lat: c.coords.latitude, lng: c.coords.longitude }))
  }
  if (!location || !Leaflet) return <div>Please enable location services!</div>
  return <ClientMap Leaflet={Leaflet} location={location} />
}

interface ClientMapProps {
  Leaflet: typeof LT
  location: { lat: number; lng: number }
}
function ClientMap({ Leaflet, location }: ClientMapProps) {
  const { data } = useQuery<FetchNearbyMap, FetchNearbyMapVariables>(fetchMap, {
    variables: { loc: location },
    ssr: false,
  })
  return (
    <Leaflet.Map className="vh-50" center={[location.lat, location.lng]} zoom={19}>
      <Leaflet.TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Leaflet.Marker position={[location.lat, location.lng]}>
        <Leaflet.Popup>You are here!</Leaflet.Popup>
      </Leaflet.Marker>
      {data?.nearby.map(art => (
        <Leaflet.Marker position={[art.location.lat, art.location.lng]} key={art.name}>
          <Leaflet.Popup>{art.name}</Leaflet.Popup>
        </Leaflet.Marker>
      ))}
    </Leaflet.Map>
  )
}
