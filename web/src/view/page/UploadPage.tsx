import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUserContext } from '../../graphql/query.gen'
import { PillButton } from '../../style/button'
import { H2, H5 } from '../../style/header'
import { ReactFileReader } from 'react-file-reader';
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

export function UploadPage(props: UploadPageProps) {
  const [selectedFile, setFile] = React.useState('')
  // const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null)
  const [name, setName] = React.useState('')
  const { data } = useQuery<FetchUserContext>(fetchUser)
  const author = !!data && !!data.self ? data.self.username : 'anonymous'
  const creator_id = !!data && !!data.self ? data.self.id : 0

  // if (!!data && !!data.self) console.log(data)
  // const UPLOAD_ART = `
  // mutation UploadArtwork($art: ArtInput!) {
  //   addArt(art: $art)
  // }`

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const fileUploadHandler = () => {
    // //TODO: send to backend??
    // //i have the name, image URL
    //author
    console.log(author)
    //name
    console.log(name)
    //location
    let lat, lng
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(c => {
        lat = c.coords.latitude
        lng = c.coords.longitude
      })
    }
    //creator id
    console.log(creator_id)
    //type: image in png for now..TODO: add text option, support jpg
    ImgToBase64.getBase64String(selectedFile)
      .then(base64String => doSomethingWith(base64String))
      .catch(err => doSomethingWith(err))
    const art = {
      art: {
        name: name,
        creatorId: creator_id, //get logged in user
        location: {
          lat: lat, //get location
          lng: lng,
        },
        data: 'data:/image/png;base64, BASE64_ENCODED_STRING_OF_IMAGE_OR_TEXT',
        //accepted types are image/png, image/jpeg, and text/plain
      },
    }
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
          <input type="file" accept=".jpeg, .jpg, .png" onChange={fileSelectedHandler}></input>
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
            Share
          </PillButton>
        </div>
      </div>
    </Page>
  )
}
