import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Art } from './Art'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  userType: UserType
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    length: 100,
  })
  name: string

  @ManyToMany(type => Art)
  @JoinTable()
  artSeen: Art
}
