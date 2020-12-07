import { ArtType } from '../../graphql/query.gen';

export interface ArtworkProps {
  id: number
  createdBy: string
  createdAt: string
  seen: boolean
  location: { lat: number; lng: number }
  name: string
  type: ArtType
  uri: string
}

export interface ArtworkCardProps {
  markSeen(artId: number): void
  $seen?: boolean
}
