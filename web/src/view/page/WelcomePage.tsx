import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H2 } from '../../style/header'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams, getLoginPath, getPath, getSignupPath, Route } from '../nav/route'

interface WelcomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function WelcomePage(props: WelcomePageProps) {
  const { user } = React.useContext(UserContext)
  let href = getLoginPath()
  if (user) {
    href = getPath(Route.HOME)
  }
  return (
    <div className="flex-column items-center justify-center">
      <div>
        <img src={require('../../../../public/imgs/wanderlust.svg')} />
      </div>
      <H2 className="flex justify-center">draw your story</H2>
      <img src={require('../../../../public/imgs/logo.svg')} />
      <div className="flex flex-column">
        <div className="flex justify-center">
          <LoginButton href={href}>Login</LoginButton>
        </div>
        <div className="flex justify-center">
          <SignUpButton href={getSignupPath()}>Sign Up</SignUpButton>
        </div>
      </div>
    </div>
  )
}

const LoginButton = style('a', 'f6 link dim br-pill ph3 pv2 mb2 dib white w-40 tc', {
  backgroundColor: '#A26EA1',
})

const SignUpButton = style('a', 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib w-40 tc', {
  color: '#A26EA1',
})
