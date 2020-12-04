import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { PillButton } from '../../style/button'
import { H2 } from '../../style/header'
import { UserContext } from '../auth/user'
import { AppRouteParams, getLoginPath, getPath, getSignupPath, Route } from '../nav/route'

interface WelcomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function WelcomePage(props: WelcomePageProps) {
  const { user } = React.useContext(UserContext)
  let href = getLoginPath()
  if (user) {
    href = getPath(Route.MAP)
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
          <PillButton $pillColor="purple" href={href}>
            Login
          </PillButton>
        </div>
        <div className="flex justify-center">
          <PillButton $pillColor="white" href={getSignupPath()}>
            Sign Up
          </PillButton>
        </div>
      </div>
    </div>
  )
}
