import { gql } from '@apollo/client'

export const fetchMap = gql`
  query FetchNearbyMap($loc: LocationInput!) {
    nearby(loc: $loc) {
      id
      createdAt
      creator {
        username
      }
      name
      location {
        lat
        lng
      }
      type
      uri
    }
  }
`
export const fetchCreatedBy = gql`
  query FetchUserName($ids: [Int!]) {
    users(ids: $ids) {
      username
    }
  }
`
