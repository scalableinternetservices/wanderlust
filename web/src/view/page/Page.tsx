import * as React from 'react'
import { NavBar } from '../nav/NavBar'

export function Page(props: React.PropsWithChildren<JSX.IntrinsicElements['div']>) {
  return (
    <div className="w-80">
      <NavBar />
      {props.children}
    </div>
  )
}
