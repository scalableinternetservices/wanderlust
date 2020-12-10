import { Column, Index } from 'typeorm'
export class Location {
  @Index()
  @Column('decimal', { precision: 16, scale: 8 })
  lat: number

  @Index()
  @Column('decimal', { precision: 16, scale: 8 })
  lng: number
}
