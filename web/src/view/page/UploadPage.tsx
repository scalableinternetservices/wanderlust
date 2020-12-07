import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUserContext } from '../../graphql/query.gen'
import { PillButton } from '../../style/button'
import { H2, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

export function UploadPage(props: UploadPageProps) {
  const [selectedFile, setFile] = React.useState('')
  const { data } = useQuery<FetchUserContext>(fetchUser)
  const name = (!!data && !!data.self) ? data.self.username : 'anonymous'

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const fileUploadHandler = () => {
    //send to backend??
  }

  return (
    <Page>
      <Spacer $h4 />
      <H2>upload artwork</H2>
      <Spacer $h4 />
      <H5>name: {name}</H5>
      <div className="flex flex-column">
        <div className="flex justify-left">
          {/* <PillButton $pillColor="white">
          Attach File
          </PillButton> */}
          <input type="file" onChange={fileSelectedHandler}></input>
          {/* <FileSelector onLoadFile={(files:FileList) => console.log(files)}/> */}
        </div>
        <Spacer $h2 />
        <div className="flex justify-center">
          <img src={selectedFile}></img>
        </div>
        <Spacer $h2 />
        <div className="flex justify-center">
          <PillButton $pillColor="purple" onClick={fileUploadHandler}>
            Submit
          </PillButton>
        </div>
      </div>
    </Page>
  )
}
