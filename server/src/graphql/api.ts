import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { ArtType, Resolvers } from './schema.types'

// datuhbase
class UwuUser {
  constructor(public id: string, public username: string, public email: string) {
    this.artworkCreated = []
    this.placesVisited = []
    this.artSeen = []
  }
  artworkCreated: UwuArt[]
  placesVisited: UwuLocation[]
  artSeen: UwuArt[]
}

class UwuArt {
  constructor(
    public id: string,
    public name: string,
    public creator: UwuUser,
    public data: string,
    public type: ArtType,
    public location: UwuLocation
  ) {
    this.createdAt = 'Database-senpai should set this'
  }
  createdAt: string
}

class UwuLocation {
  constructor(public lng: number, public lat: number) {}
}

const users: UwuUser[] = []
const arts: UwuArt[] = []

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

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => {
      // We will use this line when the db is updated
      // return ctx.user
      return users.find(user => user.email === ctx.user?.email) || null
    },
    art: async (_, { id }) => {
      // We will use this line when the database is updated
      // return (await Art.findOne({ where: { name: userName } })) || null
      return arts.find(art => art.id === id) || null
    },
    arts: async () => arts,
    user: async (_, { id }) => {
      // We will use this line when the database is updated
      // return (await User.findOne({ where: { name: userName } })) || null
      return users.find(user => user.id === id) || null
    },
    users: async () => users,
    nearby: async (_, { loc }) => {
      console.log(loc)
      return []
    },
  },
  Mutation: {
    addArt: async (_, { art }, _ctx) => {
      const { name, creator, data, type, location } = art
      // create new resource (this will all change with DB)
      const creatorUser = users.find(user => user.username === creator)
      if (!creatorUser) {
        return false
      }
      const newArt = new UwuArt('id, fix this', name, creatorUser, data, type, location)
      arts.push(newArt)
      creatorUser.artworkCreated.push(newArt)
      creatorUser.artSeen.push(newArt)
      return true
    },
  },
}
