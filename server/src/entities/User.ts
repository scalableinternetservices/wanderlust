import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Art } from './Art'

@Entity()
export class User extends BaseEntity /*implements GraphqlUser*/ {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  username: string

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column()
  password: string

  @OneToMany(type => Art, art => art.creator)
  artworkCreated: Art[]

  @ManyToMany(type => Location)
  @JoinTable()
  placesVisited: Location[]

  @ManyToMany(type => Art)
  @JoinTable()
  artSeen: Art[]
}
