import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getManager } from 'typeorm'
import { Art } from '../entities/Art'
import { User } from '../entities/User'
import { storeFile } from '../s3/storeFile'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user?: User
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Art: {
    creator: self => User.findOne({ id: self.creatorId }) as any,
  },
  User: {
    artworkCreated: self => User.findOne({ where: { id: self.id } }).then(user => user!.artworkCreated) as any,
    artSeen: self => User.findOne({ where: { id: self.id } }).then(user => user!.artSeen) as any,
    artLiked: self => User.findOne({ where: { id: self.id } }).then(user => user!.artLiked) as any,
  },
  Query: {
    self: (_, args, ctx) => (ctx.user as any) || null,
    art: async (_, { id }) => {
      const thing = (await Art.findOne({ where: { id: id } })) || null
      return thing as any
    },
    arts: async (_, args, ctx) => {
      const response: Art[] = await Art.find({ take: 128 })
      return response as any
    },
    user: async (_, { id }) => {
      return ((await User.findOne({ where: { id: id } })) as any) || null
    },
    users: async (_, { ids }) => {
      let thing
      if (!ids) {
        thing = await User.find()
      } else {
        thing = await User.createQueryBuilder('User').where('id IN (:ids)', { ids }).getMany()
      }
      return thing as any
    },
    nearby: async (_, { loc }) => {
      // This can be made more flexible
      const result = await getManager()
        .createQueryBuilder(Art, 'art')
        .where('(abs(art.location.lat - :lat) < 0.02) AND (abs(art.location.lng - :lng) < 0.02)', {
          lat: loc.lat,
          lng: loc.lng,
        })
        .limit(25)
        .getMany()
      // if (checkSeen) {
      //   // This statement requires a semicolon
      //   const seenArt: Set<number> = new Set()
      //   ;(await User.findOne())?.artSeen.forEach(art => {
      //     seenArt.add(art.id)
      //   })
      //   result.forEach((art: any) => {
      //     art.seen = seenArt.has(art.id)
      //   })
      // }
      return result as any
    },
  },
  Mutation: {
    addArt: async (_, { art }, _ctx) => {
      const { name, creatorId, data, location } = art
      if (!_ctx.user || creatorId !== _ctx.user.id) return false
      const creator = _ctx.user
      const newArt = new Art()
      newArt.name = name
      newArt.creator = creator as any
      newArt.location = location
      newArt.numReports = 0

      const [uri, artType] = await storeFile(data)
      newArt.uri = uri
      newArt.type = artType

      await newArt.save({ reload: false, transaction: false })
      return true
    },
    seeArt: async (_, { id }, ctx) => {
      const user = ctx.user || (await User.findOne(1))
      if (!user) {
        return false
      }
      const art = await Art.findOne(id)
      if (!art) {
        return false
      }
      ;(await user.artSeen).push(art)
      await user.save()
      return true
    },
  },
}
