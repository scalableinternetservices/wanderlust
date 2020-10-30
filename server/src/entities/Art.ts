import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Art extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  timeCreated: Date

  @Column()
  lat: number

  @Column()
  lng: number

  @Column()
  path: string

  @Column()
  type: string

  @Column()
  numReports: number

  @ManyToOne(type => User, user => user.artworkCreated)
  creator: User
}
