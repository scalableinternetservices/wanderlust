import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Location extends BaseEntity {
  @PrimaryColumn()
  lat: number

  @PrimaryColumn()
  lng: number
}
