import { check } from '../../../../common/src/util'
import { handleError } from '../toast/error'

export function logout() {
  return fetch('/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      check(res.ok, 'response status ' + res.status)
    })
    .catch(handleError)
}
