import { ArtType } from '../../graphql/query.gen';

export interface ArtworkProps {
  id: number
  createdBy: string
  createdAt: string
  location: { lat: number; lng: number }
  name: string
  type: ArtType
  uri: string
}
