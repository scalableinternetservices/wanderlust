import http from 'k6/http'
import { check, sleep } from 'k6'

function getUploadPage() {
  let res = http.get('http://localhost:3000/')
  check(res, { 'status was 200': r => r.status == 200 })
}

function uploadArtwork() {
  let query = `
    mutation {
      addArt(
        art: {
          name: "Load Test Text Upload"
          creatorId: 1
          location: { lat: ${Math.random() * 180 - 90}, lng: ${Math.random() * 360 - 180} }
          data: "data:text/plain;base64, SGVsbG8gd29ybGQsIHRoaXMgaXMgYSBsb2FkIHRlc3QsIGF0dGVtcHRpbmcgdG8gc2VuZCBsb2FkIHRvIHRoZSBzZXJ2ZXIuIFllZXQh"
        }
      )
    }
  `
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'x-authtoken': '87a6a66c-9526-4589-8288-e527b7b3a01a',
    },
  }
  let res = http.post('http://localhost:3000/graphql', JSON.stringify({ query: query }), params)
  console.log(res.body)
  check(res, { 'status was 200': r => r.status == 200 })
  check(res, { 'created mutation': r => !JSON.parse(r.body).errors })
}

export let options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 0 },
  ],
}

export default function () {
  getUploadPage()
  sleep(Math.random() * 4)
  uploadArtwork()
}
