import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
    nullable: false,
  })
  username: string

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
    nullable: false,
  })
  email: string

  @Column({
    nullable: false,
  })
  password: string

  @OneToMany(() => Art, art => art.creator)
  artworkCreated: Promise<Art[]>

  @ManyToMany(() => Art, art => art.views)
  artworkSeen: Promise<Art[]>

  @ManyToMany(() => Art, art => art.likes)
  artworkLiked: Promise<Art[]>
}
