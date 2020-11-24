import React from 'react'

export function PhotoButton() {
  const [takePhoto, setTakePhoto] = React.useState<() => void>((): void => {})
  if (typeof navigator !== 'undefined') {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setTakePhoto(() => new ImageCapture(stream.getVideoTracks()[0]).takePhoto().then(console.log))
      })
      .catch(console.error)
  }
  return <button onClick={takePhoto}></button>
}
