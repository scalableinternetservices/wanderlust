import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { Art } from '../entities/Art'
import { User } from '../entities/User'

// const artLoader = new DataLoader()

async function batchLoadUsers(keys: readonly number[]): Promise<(User | null)[]> {
  const users = await User.find({ where: { id: In([...keys]) } })
  const hashmap = new Map<number, User>()
  users.forEach(u => hashmap.set(u.id, u))
  return keys.map(k => hashmap.get(k) || null)
}
async function batchLoadArt(keys: readonly number[]): Promise<(Art | null)[]> {
  const users = await Art.find({ where: { id: In([...keys]) } })
  const hashmap = new Map<number, Art>()
  users.forEach(u => hashmap.set(u.id, u))
  return keys.map(k => hashmap.get(k) || null)
}

export interface Loaders {
  user: DataLoader<number, User | null>
  art: DataLoader<number, Art | null>
}
export function Loaders(): Loaders {
  return {
    user: new DataLoader<number, User | null>(keys => batchLoadUsers(keys)),
    art: new DataLoader<number, Art | null>(keys => batchLoadArt(keys)),
  }
}
