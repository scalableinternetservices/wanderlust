import { gql } from '@apollo/client'

export const fetchMap = gql`
  query FetchNearbyMap($loc: LocationInput!) {
    nearby(loc: $loc) {
      name
      location {
        lat
        lng
      }
    }
  }
`
