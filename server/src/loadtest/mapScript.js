import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '50s', target: 300 },
    { duration: '50s', target: 200 },
    { duration: '20s', target: 0 },
  ],
};

function getMap () {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'x-authtoken': 'da1357db-14cd-4f62-9208-968869454750',
    },
  }
  let res = http.get('http://localhost:3000/app/map', params)
  check(res, { 'status was 200': (r) => r.status == 200 })
}

export default function () {
  getMap()
  sleep(1)
}
