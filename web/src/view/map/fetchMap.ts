import { gql } from '@apollo/client'

export const fetchMap = gql`
  query FetchNearbyMap($loc: LocationInput!, $checkSeen: Boolean) {
    nearby(loc: $loc, checkSeen: $checkSeen) {
      id
      createdAt
      creatorId
      seen
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

export const markArtSeen = gql`
  mutation SeeArt($id: Int!) {
    seeArt(id: $id) {
      id
      seen
    }
  }
`
