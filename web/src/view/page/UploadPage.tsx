import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { PillButton } from '../../style/button'
import { H2, H5 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'


interface UploadPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function fileSelectedHandler = (event: any) => {
//   console.log("file change");
//   console.log(event);
// }

// const FileSelector = (props:{onLoadFile: (files:FileList)=> void}) => (
// 	<input type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.onLoadFile(e.target.files[0])} />
// );

export function UploadPage(props: UploadPageProps) {
  const [selectedFile, setFile] = React.useState('');

  const fileSelectedHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    //console.log("inside file selected handler");
    if(event.target.files){
      // console.log(event.target.files[0]);
      setFile(URL.createObjectURL(event.target.files[0]));
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
      <H5>name: </H5>
      <div className="flex flex-column">
        <div className="flex justify-center">
          {/* <PillButton $pillColor="white">
          Attach File
          </PillButton> */}
          <input type="file" onChange={fileSelectedHandler}></input>
          {/* <FileSelector onLoadFile={(files:FileList) => console.log(files)}/> */}
        </div>
        <div className="flex justify-center">
        <PillButton $pillColor="purple" onClick={fileUploadHandler}>
          Submit
        </PillButton>
        </div>
        <img src={selectedFile}></img>
      </div>
    </Page>
  )
}

