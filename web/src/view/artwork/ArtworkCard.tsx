import * as React from 'react'
import { ArtType } from '../../graphql/query.gen'
import { H4 } from '../../style/header'
import { style } from '../../style/styled'

export interface ArtworkProps {
  id: number
  location: { lat: number; lng: number }
  name: string
  type: ArtType
  uri: string
}

export function ArtworkCard({ name, type, uri }: ArtworkProps) {
  // TODO: Fetch art content from S3 using uri property

  return (
    <div className="flex flex-wrap w-40-l w-90 h4 br4 mb3 shadow-4">
      <ArtContent />
      <H4 className="w-50 pl2 pr2 self-center tc truncate">{name}</H4>
    </div>
  )
}

const ArtContent = style('div', 'avenir f3 w-50 br', { borderRight: 'solid 1px rgba(0, 0, 0, .15)' })
