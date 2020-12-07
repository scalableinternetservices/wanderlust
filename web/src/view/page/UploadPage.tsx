import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { H2, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function UploadPage(props: UploadPageProps) {
  return (
    <Page>
      <Spacer $h4 />
      <H2>upload artwork</H2>
      <Spacer $h4 />
      <H5>name: </H5>
      <div className="flex flex-column">
        <div className="flex justify-center">
          <AttachButton>Attach file</AttachButton>
        </div>
        <div className="flex justify-center">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </div>
    </Page>
  )
}

const SubmitButton = style('a', 'f6 link dim br-pill ph3 pv2 mb2 dib white w-40 tc', {
  backgroundColor: '#A26EA1',
})

const AttachButton = style('a', 'f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib w-40 tc', {
  color: '#A26EA1',
})
