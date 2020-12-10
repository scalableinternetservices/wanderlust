import http from 'k6/http'
import { check } from 'k6'
let host = `http://${__ENV.HOST || 'localhost:3000'}`

function getMainPageQuery() {
  let query = `
  query FetchNearbyMap($loc: LocationInput!) {
    nearby(loc: $loc) {
      id
      createdAt
      creator {
        username
        id
      }
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
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `${__ENV.TESTER || 'loadtest'}/k6`,
    },
  }
  let variables = {
    loc: {
      lat: 34.0156128 + Math.random() * 2 - 1,
      lng: -118.5030432 + Math.random() * 2 - 1,
    },
  }
  let res = http.post(`${host}/graphql`, JSON.stringify({ query: query, variables: variables }), params)
  check(res, { 'status was 200': r => r.status == 200 })
  check(res, { 'no errors': r => !JSON.parse(r.body).errors })
}

export let options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0 },
  ],
}

export default function () {
  getMainPageQuery()
}
