import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUserContext } from '../../graphql/query.gen'
import { PillButton } from '../../style/button'
import { H2, H5 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

export function UploadPage(props: UploadPageProps) {
  const [selectedFile, setFile] = React.useState('')
  const [name, setName] = React.useState('')
  const { data } = useQuery<FetchUserContext>(fetchUser)
  const author = !!data && !!data.self ? data.self.username : 'anonymous'

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const fileUploadHandler = () => {
    //TODO: send to backend??
    //i have the name, image URL
    console.log(name)
  }

  return (
    <Page>
      <Spacer $h4 />
      <H2>upload artwork</H2>
      <Spacer $h4 />
      <div className="flex flex-column">
        <H5>author: {author}</H5>
        <div className="flex justify-left">
          <H5>name: </H5>
          <Input $onChange={setName} name="name" type="text" placeholder="enter" />
        </div>
        <Spacer $h2 />
        <div className="flex-justify-left">
          <H5>image: </H5>
        </div>
        <div className="flex justify-center">
          <input type="file" onChange={fileSelectedHandler}></input>
        </div>
        <Spacer $h2 />
        <br></br>
        <div className="flex justify-center">
          <img src={selectedFile}></img>
        </div>
        <Spacer $h1 />
        {selectedFile == '' && (
          <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </>
        )}
        <br></br>
        <div className="flex justify-center">
          <PillButton $pillColor="purple" onClick={fileUploadHandler}>
            Submit
          </PillButton>
        </div>
      </div>
    </Page>
  )
}
