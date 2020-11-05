import { Location } from 'server/src/graphql/schema.types'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { marshalLocation, unmarshalLocation } from './transformers/ArtTransformers'
import { User } from './User'
@Entity()
export class Art extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: string

  @Column({
    type: 'point',
    transformer: {
      from: (loc: string) => unmarshalLocation(loc),
      to: (loc: Location) => marshalLocation(loc)
    }
  })
  location: Location;

  @Column()
  uri: string

  @Column('int')
  type: ArtType

  @Column({
    default: 0
  })
  numReports: number

  @ManyToOne(() => User, user => user.artworkCreated)
  creator: User
}

enum ArtType {
  Text,
  Image,
  Audio,
  Video
}