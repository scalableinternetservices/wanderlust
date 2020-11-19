import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { getManager } from 'typeorm'
import { Art } from '../entities/Art'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: any // TODO: Change this to a real type
  request: Request
  response: Response
  pubsub: PubSub
}

function storeFile(data: string): string {
  // Store data
  // Retrieve uri
  return "NotImplemented"
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => {
      return ctx.user
      // return users.find(user => user.email === ctx.user?.email) || null
    },
    art: async (_, { id }) => {
      const thing = (await Art.findOne({ where: { id: id } })) || null
      console.log(thing)
      return thing
      // return arts.find(art => art.id === id) || null
    },
    arts: async () => {
      const thing = await Art.find()
      console.log(thing)
      return thing
    },
    user: async (_, { id }) => {
      // We will use this line when the database is updated
      return (await User.findOne({ where: { id: id } })) || null
      // return users.find(user => user.id === id) || null
    },
    users: async () => {
      const thing = await User.find()
      console.log(thing[0].artworkCreated)
      return thing
    },
    nearby: async (_, { loc }) => {
      // This can be made more flexible
      const result = await getManager()
        .createQueryBuilder(Art, "art")
        .where("(abs(art.location.lat - :lat) < 0.02) AND (abs(art.location.lng - :lng) < 0.02)", { lat: loc.lat, lng: loc.lng })
        .limit(25)
        .getMany()
      return result
    },
  },
  Mutation: {
    addArt: async (_, { art }, _ctx) => {
      const { name, creatorId, data, type, location } = art
      // create new resource (this will all change with DB)
      const creator = await User.findOne({ where: { id: creatorId } })
      if (!creator) {
        return false
      }
      let newArt = new Art()
      newArt.name = name
      newArt.creator = creator
      creator.artworkCreated.push(newArt)
      newArt.type = type
      newArt.location = location
      newArt.numReports = 0
      newArt.uri = storeFile(data)

      await newArt.save()
      await creator.save()
      return true
    },
  },
}
