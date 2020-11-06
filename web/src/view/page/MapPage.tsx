import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type * as LT from 'react-leaflet'
import { Map } from '../map/Map'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface MapPageProps extends RouteComponentProps, AppRouteParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MapPage(props: MapPageProps) {
  // let Leaflet: typeof LT | undefined = undefined
  // const [location, setLocation] = React.useState<[number, number]>([0, 0])
  if (typeof window !== 'undefined') {
    // Leaflet = require('react-leaflet')
  }
  if (typeof navigator !== 'undefined') {
    // navigator.geolocation.getCurrentPosition(c => setLocation([c.coords.latitude, c.coords.longitude]))
  }
  return (
    <Page>
      <Map />
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
