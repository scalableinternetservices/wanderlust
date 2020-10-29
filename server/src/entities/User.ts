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
import { Art } from './Art'

@Entity()
export class User extends BaseEntity /*implements GraphqlUser*/ {
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
