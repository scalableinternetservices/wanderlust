import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  art?: Maybe<Art>
  arts: Array<Art>
  user?: Maybe<User>
  users: Array<User>
  userNames: Array<User>
  nearby: Array<Art>
}

export interface QueryArtArgs {
  id: Scalars['Int']
}

export interface QueryUserArgs {
  id: Scalars['Int']
}

export interface QueryUsersArgs {
  ids?: Maybe<Array<Scalars['Int']>>
}

export interface QueryNearbyArgs {
  loc: LocationInput
}

export interface Mutation {
  __typename?: 'Mutation'
  addArt: Scalars['Boolean']
}

export interface MutationAddArtArgs {
  art: ArtInput
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  username: Scalars['String']
  email: Scalars['String']
  artworkCreated: Array<Art>
  artSeen: Array<Art>
}

export interface Art {
  __typename?: 'Art'
  id: Scalars['Int']
  name: Scalars['String']
  creatorId: Scalars['Int']
  createdAt: Scalars['String']
  location: Location
  uri: Scalars['String']
  type: ArtType
}

export interface Location {
  __typename?: 'Location'
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export enum ArtType {
  Text = 'Text',
  Image = 'Image',
  Audio = 'Audio',
  Video = 'Video',
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface ArtInput {
  name: Scalars['String']
  creatorId: Scalars['Int']
  location: LocationInput
  data: Scalars['String']
}

export interface LocationInput {
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  User: ResolverTypeWrapper<User>
  String: ResolverTypeWrapper<Scalars['String']>
  Art: ResolverTypeWrapper<Art>
  Location: ResolverTypeWrapper<Location>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ArtType: ArtType
  UserType: UserType
  ArtInput: ArtInput
  LocationInput: LocationInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  User: User
  String: Scalars['String']
  Art: Art
  Location: Location
  Float: Scalars['Float']
  ArtInput: ArtInput
  LocationInput: LocationInput
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  art?: Resolver<Maybe<ResolversTypes['Art']>, ParentType, ContextType, RequireFields<QueryArtArgs, 'id'>>
  arts?: Resolver<Array<ResolversTypes['Art']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>
  nearby?: Resolver<Array<ResolversTypes['Art']>, ParentType, ContextType, RequireFields<QueryNearbyArgs, 'loc'>>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addArt?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddArtArgs, 'art'>>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  artworkCreated?: Resolver<Array<ResolversTypes['Art']>, ParentType, ContextType>
  artSeen?: Resolver<Array<ResolversTypes['Art']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ArtResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Art'] = ResolversParentTypes['Art']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  creatorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['ArtType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Art?: ArtResolvers<ContextType>
  Location?: LocationResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
