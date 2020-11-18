import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '50s', target: 140 },
    { duration: '50s', target: 70 },
    { duration: '20s', target: 0 },
  ],
};

function getMap () {
  let res = http.get('http://localhost:3000/app/map')
  check(res, { 'status was 200': (r) => r.status == 200 })
}

export default function () {
  getMap()
  sleep(1)
}