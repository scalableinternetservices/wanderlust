import { useMutation, useQuery } from '@apollo/client'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchNearbyMap, FetchNearbyMapVariables, SeeArt, SeeArtVariables } from '../../graphql/query.gen'
import { H2 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { ArtworkCard } from '../artwork/ArtworkCard'
import { ArtworkProps as Artwork } from '../artwork/ArtworkProps'
import { fetchMap, markArtSeen } from '../map/fetchMap'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type * as LT from 'react-leaflet'
import { Map } from '../map/Map'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface MapPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MapPage(props: MapPageProps) {
  // hooks
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const [artworks, setArtworks] = React.useState<Artwork[]>([])
  const [radioValue, setRadioValue] = React.useState('not-visited')

  // graphql
  const { data: data_nearby, loading: loading_nearby } = useQuery<FetchNearbyMap, FetchNearbyMapVariables>(fetchMap, {
    variables: { loc: location ? location : { lat: 0, lng: 0 } },
    ssr: false,
  })
  const [seeArt] = useMutation<SeeArt, SeeArtVariables>(markArtSeen)

  // update seen property of artwork
  const markSeen = (artId: number) => {
    seeArt({ variables: { id: artId } })
      .then(response => {
        const data = response.data
        if (data && data?.seeArt) {
          setArtworks(
            artworks.map(art => {
              if (art.id === artId) {
                art.seen = true
              }
              return art
            })
          )
        }
      })
      .catch(err => console.log(err))
  }
  // on change handler function for radio button
  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    console.log(value)
    setRadioValue(value)
  }

  // elements
  const loadingText = loading_nearby ? <div>loading...</div> : null
  const noArtworksText = !artworks || artworks.length === 0 ? 'no artwork nearby!' : null

  if (data_nearby && data_nearby?.nearby.length > 0 && artworks.length <= 0) {
    setArtworks(
      data_nearby.nearby.map(
        (art, i) =>
          ({
            id: art.id,
            createdBy: art.creator.username,
            createdAt: art.createdAt,
            seen: art.seen,
            location: art.location,
            name: art.name,
            type: art.type,
            uri: art.uri,
          } as Artwork)
      )
    )
  }

  const artworkCards = artworks.map(art => {
    return <ArtworkCard $seen={art.seen} key={art.id} markSeen={markSeen} {...art} />
  })
  const unvisitedArtworkCards = artworkCards.filter((art, i) => !artworks[i].seen)

  return (
    <Page>
      <Spacer $h3 />
      <H2>current location</H2>
      <Spacer $h4 />
      <Map
        getLocation={() => location}
        updateLocation={(lat: number, lng: number) => setLocation({ lat, lng })}
        artworks={artworks}
      />

      <Spacer $h3 />
      <H2>artwork near you</H2>
      <Spacer $h2 />
      <FormControl component="fieldset">
        <RadioGroup row aria-label="view" name="view-by" value={radioValue} onChange={handleViewChange}>
          <FormControlLabel value="not-visited" control={<Radio color="secondary" />} label="Not visited" />
          <FormControlLabel value="all" control={<Radio color="secondary" />} label="All" />
        </RadioGroup>
      </FormControl>
      <Spacer $h2 />

      <div className="w-90-l center flex flex-wrap-l flex-row-l flex-column justify-center-l justify-around items-center">
        {loadingText}
        {noArtworksText}
        {radioValue === 'not-visited' ? unvisitedArtworkCards : artworkCards}
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
