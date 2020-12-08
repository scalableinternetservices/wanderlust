import { Column } from 'typeorm'
export class Location {
  @Column('decimal', { precision: 16, scale: 8 })
  lat: number
  @Column('decimal', { precision: 16, scale: 8 })
  lng: number
}
