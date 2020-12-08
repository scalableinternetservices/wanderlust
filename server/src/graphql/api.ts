import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getConnection, getManager, QueryFailedError } from 'typeorm'
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
    views: self => Art.findOne({ id: self.id }).then(art => art!.views) as any,
    likes: self => Art.findOne({ id: self.id }).then(art => art!.likes) as any,
    seen: async (self, _, ctx) => {
      if (!ctx.user) return null
      const count = await getConnection()
        .createQueryBuilder()
        .select('1')
        .from('art_views_user', 'avu')
        .where('artId = :aid', { aid: self.id })
        .andWhere('userId = :uid', { uid: ctx.user.id })
        .getCount()
      return count === 1
    },
  },
  User: {
    artworkCreated: self => User.findOne({ where: { id: self.id } }).then(user => user!.artworkCreated) as any,
    artSeen: self => User.findOne({ where: { id: self.id } }).then(user => user!.artworkSeen) as any,
    artLiked: self => User.findOne({ where: { id: self.id } }).then(user => user!.artworkLiked) as any,
  },
  Query: {
    self: (_, args, ctx) => (ctx.user as any) || null,
    art: async (_, { id }) => Art.findOne({ where: { id: id } }) as any,
    arts: async () => Art.find({ take: 128 }) as any,
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
      const result = await getManager()
        .createQueryBuilder(Art, 'art')
        .where('(abs(art.location.lat - :lat) < 0.02) AND (abs(art.location.lng - :lng) < 0.02)', {
          lat: loc.lat,
          lng: loc.lng,
        })
        .getMany()
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
      const user = ctx.user
      if (!user) return false
      await getConnection()
        .createQueryBuilder()
        .relation(Art, 'views')
        .of(id)
        .add(user)
        .catch(e => {
          if (!(e instanceof QueryFailedError && e.message.match(/Duplicate entry/))) throw e
        })
      return true
    },
    likeArt: async (_, { id }, ctx) => {
      const user = ctx.user
      if (!user) return false
      await getConnection()
        .createQueryBuilder()
        .relation(Art, 'likes')
        .of(id)
        .add(user)
        .catch(e => {
          if (!(e instanceof QueryFailedError && e.message.match(/Duplicate entry/))) throw e
        })
      return true
    },
  },
}
