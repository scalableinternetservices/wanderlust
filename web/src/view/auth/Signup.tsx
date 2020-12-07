import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { check } from '../../../../common/src/util'
import { PillButton } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { AppRouteParams, getWelcomePath } from '../nav/route'
import { toastErr } from '../toast/toast'

interface SignupPageProps extends RouteComponentProps, AppRouteParams {}

export function Signup(props: SignupPageProps) {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [err, setError] = React.useState({ email: false, name: false, password: false })

  // reset error when email/name change
  React.useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  React.useEffect(() => setError({ ...err, name: false }), [name])
  React.useEffect(() => setError({ ...err, password: false }), [password])

  function login() {
    if (!validate(email, name, password, setError)) {
      toastErr('invalid email/name/password')
      return
    }

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.replace('/app/map'))
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, name: true, password: true })
      })
  }

  return (
    <div className="flex-column items-center justify-center pl4 pr4">
      <a href={getWelcomePath()}>
        <img src={require('../../../../public/imgs/arrowLeft.svg')} className="mb2" />
      </a>
      <H1 className="flex">sign up</H1>
      <div>
        <img className="vh-30 mw5" src={require('../../../../public/imgs/signup.svg')} />
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
        <Input $hasError={err.name} $onChange={setName} $onSubmit={login} name="name" placeholder="name" />
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
          Sign Up
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
  name: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean; name: boolean; password: boolean }>>
) {
  const validEmail = validateEmail(email)
  const validName = Boolean(name)
  const validPassword = Boolean(password)
  setError({ email: !validEmail, name: !validName, password: !validPassword })
  return validEmail && validName && validPassword
}
