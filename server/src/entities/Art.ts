import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Art extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  lat: number

  @Column()
  lng: number

  @Column()
  path: string

  @Column()
  numReports: number

  @OneToOne(type => User)
  @JoinColumn()
  createdById: User
}
