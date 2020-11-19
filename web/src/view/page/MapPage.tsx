import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchNearbyMap, FetchNearbyMapVariables } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { ArtworkCard, ArtworkProps as Artwork } from '../artwork/ArtworkCard'
import { fetchMap } from '../map/fetchMap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type * as LT from 'react-leaflet'
import { Map } from '../map/Map'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface MapPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MapPage(props: MapPageProps) {
  // let Leaflet: typeof LT | undefined = undefined

  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const { data, loading } = useQuery<FetchNearbyMap, FetchNearbyMapVariables>(fetchMap, {
    variables: { loc: location ? location : { lat: 0, lng: 0 } },
    ssr: false,
  })

  if (typeof window !== 'undefined') {
    // Leaflet = require('react-leaflet')
  }
  if (typeof navigator !== 'undefined') {
    // navigator.geolocation.getCurrentPosition(c => setLocation([c.coords.latitude, c.coords.longitude]))
  }

  const loadingText = loading ? <div>loading...</div> : null
  const artworkPreviews =
    !data || data.nearby.length === 0 ? (
      <div className="f4 avenir pl2">no artwork nearby!</div>
    ) : (
      data?.nearby.map(art => <ArtworkCard key={art.id} {...art} />)
    )

  return (
    <Page>
      <Spacer $h3 />
      <H2>current location</H2>
      <Spacer $h4 />
      <Map
        getLocation={() => location}
        updateLocation={(lat: number, lng: number) => setLocation({ lat: lat, lng: lng })}
        artworks={
          data
            ? data?.nearby.map(
                art =>
                  ({
                    id: art.id,
                    location: art.location,
                    name: art.name,
                    type: art.type,
                    uri: art.uri,
                  } as Artwork)
              )
            : []
        }
      />

      <Spacer $h3 />
      <H2>artwork near you</H2>
      <Spacer $h4 />

      <div className="w-80-l center flex flex-row-l flex-column justify-around items-center">
        {loadingText}
        {artworkPreviews}
      </div>

      {/* <div id="map-container" style={{ height: 180 }}>
        {!Leaflet ? (
          <div>Loading</div>
        ) : (
          <Leaflet.Map center={location} zoom={13}>
            <Leaflet.TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Leaflet.Marker position={location}>
              <Leaflet.Popup>You are here!</Leaflet.Popup>
            </Leaflet.Marker>
          </Leaflet.Map>
        )}
      </div> */}
    </Page>
  )
}
