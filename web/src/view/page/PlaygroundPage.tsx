import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams {}

export function PlaygroundPage(props: PlaygroundPageProps) {
  // return <Page>{getPlaygroundApp(props.app)}</Page>
  return <Page></Page>
}

// function getPlaygroundApp(app?: PlaygroundApp) {
//   if (!app) {
//     return <div>choose an app</div>
//   }
//   switch (app) {
//     // case PlaygroundApp.LOGIN:
//     //   return <Login />
//     // case PlaygroundApp.SIGNUP:
//     //   return <Signup />
//     default:
//       throw new Error('no app found')
//   }
// }
