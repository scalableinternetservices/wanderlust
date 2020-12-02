import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchNearbyMap, FetchNearbyMapVariables } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { ArtworkCard } from '../artwork/ArtworkCard'
import { ArtworkProps as Artwork } from '../artwork/ArtworkProps'
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
  const { data: data_nearby, loading: loading_nearby } = useQuery<FetchNearbyMap, FetchNearbyMapVariables>(fetchMap, {
    variables: { loc: location ? location : { lat: 0, lng: 0 } },
    ssr: false,
  })
  // const { data: data_user, loading: loading_user } = useQuery<FetchUserName, FetchUserNameVariables>(fetchCreatedBy, {
  //   variables: { id: data_nearby?.nearby.id ? data_nearby.nearby.id : -1 },
  //   ssr: false,
  // })

  if (typeof window !== 'undefined') {
    // Leaflet = require('react-leaflet')
  }
  if (typeof navigator !== 'undefined') {
    // navigator.geolocation.getCurrentPosition(c => setLocation([c.coords.latitude, c.coords.longitude]))
  }

  const loadingText = loading_nearby ? <div>loading...</div> : null
  const artworkCards =
    !data_nearby || data_nearby.nearby.length === 0 ? (
      <div className="f4 avenir pl2">no artwork nearby!</div>
    ) : (
      data_nearby?.nearby.map(art => <ArtworkCard key={art.id} {...art} />)
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
          data_nearby
            ? data_nearby?.nearby.map(
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

      <div className="w-90-l center flex flex-wrap-l flex-row-l flex-column justify-center-l justify-around items-center">
        {loadingText}
        {artworkCards}
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
