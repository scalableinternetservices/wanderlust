import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { ArtType, Resolvers } from './schema.types'

// datuhbase
class UwuUser {
  constructor(public username: string, public email: string) {
    this.artworkCreated = []
    this.placesVisited = []
    this.artSeen = []
  }
  artworkCreated: UwuArt[]
  placesVisited: UwuLoc[]
  artSeen: UwuArt[]
}

class UwuArt {
  constructor(
    public name: string,
    public creator: UwuUser,
    public data: string,
    public type: ArtType,
    public location: UwuLoc
  ) {
    this.createdAt = 'Database-senpai should set this'
  }
  createdAt: string
}

class UwuLoc {
  constructor(public lon: number, public lat: number) {}
}

const users: UwuUser[] = []
const arts: UwuArt[] = []

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
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
    art: async (_, { artName }) => {
      // We will use this line when the database is updated
      // return (await Art.findOne({ where: { name: userName } })) || null
      return arts.find(art => art.name === artName) || null
    },
    arts: async () => arts,
    user: async (_, { userName }) => {
      // We will use this line when the database is updated
      // return (await User.findOne({ where: { name: userName } })) || null
      return users.find(user => user.username === userName) || null
    },
    users: async () => users,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
  },
  Mutation: {
    addUser: async (_, { user }, _ctx) => {
      const { username, email } = user
      // create new resource (this will all change with DB)
      const newUser = new UwuUser(username, email)
      users.push(newUser)
      return true
    },
    addArt: async (_, { art }, _ctx) => {
      const { name, creator, data, type, location } = art
      // create new resource (this will all change with DB)
      const creatorUser = users.find(user => user.username === creator)
      if (!creatorUser) {
        return false
      }
      const newArt = new UwuArt(name, creatorUser, data, type, location)
      arts.push(newArt)
      creatorUser.artworkCreated.push(newArt)
      creatorUser.artSeen.push(newArt)
      return true
    },
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
