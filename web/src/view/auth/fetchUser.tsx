import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self {
      username
      email
    }
  }
`
