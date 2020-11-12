import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

function findArt () {
  let artQuery = `
    query nearby {
      nearby(loc: {lat: ${__ITER % 1000}, lng: ${(__ITER + 500) % 1000}}) {
        id
        name
        location {
          lat
          lng
        }
        creatorId
        createdAt
      }
    }
  `
  let headers = {
    'Content-Type': 'application/json',
  }
  let res = http.post('http://localhost:3000/graphql', JSON.stringify({ query: artQuery }), { headers: headers })
  check(res, { 'status was 200': (r) => r.status == 200 })
}

function getMap () {
  let res = http.get('http://localhost:3000/app/map')
  check(res, { 'status was 200': (r) => r.status == 200 })
}

export default function () {
  getMap()
  sleep(1)
  findArt()
  sleep(1)
}