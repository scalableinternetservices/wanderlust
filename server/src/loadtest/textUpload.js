import http from 'k6/http'
import { check, sleep } from 'k6'
let host = `http://${__ENV.HOST || 'localhost:3000'}`
function getUploadPage() {
  let res = http.get(host)
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
      'x-authtoken': 'f845f391-66c6-40f5-b101-975adffb41bb',
    },
  }
  let res = http.post(`${host}/graphql`, JSON.stringify({ query: query }), params)
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
