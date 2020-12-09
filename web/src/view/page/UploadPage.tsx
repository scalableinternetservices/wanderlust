import { gql, useMutation, useQuery } from '@apollo/client'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { navigate, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUserContext } from '../../graphql/query.gen'
import { PillButton } from '../../style/button'
import { H2, H5 } from '../../style/header'
import { Input } from '../../style/input'
import { Spacer } from '../../style/spacer'
import { fetchUser } from '../auth/fetchUser'
import { AppRouteParams, getMapPath } from '../nav/route'
import { Page } from './Page'

interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

//defining mutation for later use
const UPLOAD_ART = gql`
  mutation UploadArtwork($art: ArtInput!) {
    addArt(art: $art)
  }
`

export function UploadPage(props: UploadPageProps) {
  const [selected_file_url, setFileURL] = React.useState('')
  const [art_string, setArtString] = React.useState('') //BASE64_ENCODED_STRING_OF_IMAGE_OR_TEXT
  const [type, setType] = React.useState('') //accepted types are image/png, image/jpeg, and text/plain
  const [name, setName] = React.useState('')
  const [text, setText] = React.useState('')
  const [radioValue, setRadioValue] = React.useState('image-type')
  const { data } = useQuery<FetchUserContext>(fetchUser)
  const [uploadArt] = useMutation(UPLOAD_ART)
  const author = !!data && !!data.self ? data.self.username : 'anonymous'
  const creator_id = !!data && !!data.self ? data.self.id : 0

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setFileURL(URL.createObjectURL(files[0]))
      setType(files[0].type)
      const reader = new FileReader()
      reader.onload = function (event) {
        if (event && event.target && event.target.result) {
          const binaryString = event.target.result as string
          setArtString(btoa(binaryString))
        }
      }
      reader.readAsBinaryString(files[0])
    }
  }

  const fileUploadHandler = async () => {
    let lat, lng
    let data64 = art_string
    if (type === 'text/plain') {
      data64 = btoa(text)
    }
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(c => {
        lat = c.coords.latitude
        lng = c.coords.longitude
        if (lat && lng) {
          const data = 'data:' + type + ';base64, ' + data64
          const art = {
            name: name,
            creatorId: creator_id,
            location: {
              lat: lat,
              lng: lng,
            },
            data: data,
          }
          void uploadArt({
            variables: { art: art },
          })
        } else {
          console.log('cannot share: not able to retrieve location')
          alert('Art was was not shared: unable to access location')
        }
      })
    }
  }

  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRadioValue(value)
    if (value === 'text-type') {
      setType('text/plain')
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
          <H5>title: </H5>
          <Input $onChange={setName} name="name" type="text" placeholder="enter" />
        </div>
        <Spacer $h2 />
        <div className="flex-justify-left">
          <H5>type: </H5>
        </div>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="view" name="view-by" value={radioValue} onChange={handleViewChange}>
            <FormControlLabel value="image-type" control={<Radio color="secondary" />} label="Image" />
            <FormControlLabel value="text-type" control={<Radio color="secondary" />} label="Text" />
          </RadioGroup>
        </FormControl>
        <Spacer $h2 />
        {radioValue === 'image-type' && (
          <>
            <div className="flex-justify-left">
              <H5>image: </H5>
            </div>
            <div className="flex justify-center">
              <input type="file" accept=".jpeg, .jpg, .png" onChange={fileSelectedHandler}></input>
            </div>
          </>
        )}
        {radioValue === 'text-type' && (
          <>
            <div className="flex justify-left">
              <H5>text: </H5>
              <Input $onChange={setText} name="art-text" type="text" placeholder="enter" />
            </div>
          </>
        )}
        <Spacer $h2 />
        <br></br>
        {radioValue === 'image-type' && (
          <div className="flex justify-center">
            <img src={selected_file_url}></img>
          </div>
        )}
        <Spacer $h1 />
        {radioValue === 'image-type' && selected_file_url === '' && (
          <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </>
        )}
        <br></br>
        <div className="flex justify-center">
          <PillButton $pillColor="purple" onClick={() => fileUploadHandler().then(() => navigate(getMapPath()))}>
            Share
          </PillButton>
        </div>
      </div>
    </Page>
  )
}
