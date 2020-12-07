import { navigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { check } from '../../../../common/src/util'
import { PillButton } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { AppRouteParams, getWelcomePath } from '../nav/route'
import { handleError } from '../toast/error'
import { toastErr } from '../toast/toast'
import { UserContext } from './user'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

export function Login(props: LoginPageProps) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [err, setError] = React.useState({ email: false, password: false })
  const { user } = React.useContext(UserContext)

  // reset error when email/password change
  React.useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  React.useEffect(() => setError({ ...err, password: false }), [password])

  function login() {
    if (!validate(email, password, setError)) {
      toastErr('invalid email/password')
      return
    }

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.reload())
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, password: true })
      })
  }

  if (user) {
    navigate('/app').catch(handleError)
  }

  return (
    <div className="flex-column items-center justify-center pl4 pr4">
      <a href={getWelcomePath()}>
        <img src={require('../../../../public/imgs/arrowLeft.svg')} className="mb2" />
      </a>
      <H1 className="flex">log in</H1>
      <div>
        <img className="vh-30 mw5" src={require('../../../../public/imgs/login.svg')} />
      </div>
      <div className="mt3">
        <Input
          $hasError={err.email}
          $onChange={setEmail}
          $onSubmit={login}
          name="email"
          type="email"
          placeholder="email"
        />
      </div>
      <div className="mt3">
        <Input
          $hasError={err.password}
          $onChange={setPassword}
          $onSubmit={login}
          name="password"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex justify-center mt3">
        <PillButton $pillColor="purple" onClick={login}>
          Sign In
        </PillButton>
      </div>
    </div>
  )
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validate(
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean; password: boolean }>>
) {
  const validEmail = validateEmail(email)
  const validPassword = Boolean(password)
  setError({ email: !validEmail, password: !validPassword })
  return validEmail && validPassword
}
