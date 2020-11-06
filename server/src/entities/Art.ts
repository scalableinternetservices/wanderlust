import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ArtType } from '../graphql/schema.types'
import { Location } from './Location'
import { User } from './User'

@Entity()
export class Art extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: string

  @Column(type => Location)
  location: Location;

  @Column()
  uri: string

  @Column({
    type: "enum",
    enum: ArtType
  })
  type: ArtType

  @Column({
    default: 0
  })
  numReports: number

  @ManyToOne(() => User, user => user.artworkCreated)
  @JoinColumn({ name: "creatorId" })
  creator: User

  @Column({ nullable: false })
  creatorId: number
}
