import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
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
  location: Location

  @Column()
  uri: string

  @Column({
    type: 'enum',
    enum: ArtType,
  })
  type: ArtType

  @Column({
    default: 0,
  })
  numReports: number

  @ManyToOne(() => User, user => user.artworkCreated)
  @JoinColumn({ name: 'creatorId' })
  creator: Promise<User>

  @Column({ nullable: false })
  creatorId: number

  @ManyToMany(() => User, user => user.artworkLiked)
  @JoinTable()
  likes: Promise<User[]>

  @ManyToMany(() => User, user => user.artworkSeen)
  @JoinTable()
  views: Promise<User[]>
}
