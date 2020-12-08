import http from 'k6/http'
import { check, sleep } from 'k6'
let host = `http://${__ENV.HOST || 'localhost:3000'}`
function getPage() {
  let res = http.get(host)
  check(res, { 'status was 200': r => r.status == 200 })
}

function getArtwork() {
  let query = `
    query arts {
      arts {
        name
      }
    }
  `
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'x-authtoken': 'da1357db-14cd-4f62-9208-968869454750',
    },
  }
  let res = http.post(`${host}/graphql`, JSON.stringify({ query: query }), params)
  check(res, { 'status was 200': r => r.status == 200 })
}

export let options = {
  stages: [
    { duration: '20s', target: 80 },
    { duration: '1m', target: 80 },
    { duration: '20s', target: 0 },
  ],
}

export default function () {
  getPage()
  sleep(Math.random() * 4)
  getArtwork()
}
