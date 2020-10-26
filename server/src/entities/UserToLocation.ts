import { BaseEntity, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class UserToLocation extends BaseEntity {
  @OneToOne(type => User)
  @PrimaryColumn()
  userId: User

  @PrimaryColumn()
  lat: number

  @PrimaryColumn()
  lng: number
}
