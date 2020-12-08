/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  username: string;
  email: string;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchNearbyMap
// ====================================================

export interface FetchNearbyMap_nearby_location {
  __typename: "Location";
  lat: number;
  lng: number;
}

export interface FetchNearbyMap_nearby {
  __typename: "Art";
  id: number;
  createdAt: string;
  creatorId: number;
  seen: boolean | null;
  name: string;
  location: FetchNearbyMap_nearby_location;
  type: ArtType;
  uri: string;
}

export interface FetchNearbyMap {
  nearby: FetchNearbyMap_nearby[];
}

export interface FetchNearbyMapVariables {
  loc: LocationInput;
  checkSeen?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserName
// ====================================================

export interface FetchUserName_users {
  __typename: "User";
  username: string;
}

export interface FetchUserName {
  users: FetchUserName_users[];
}

export interface FetchUserNameVariables {
  ids?: number[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SeeArt
// ====================================================

export interface SeeArt_seeArt {
  __typename: "SeeArtResponse";
  id: number;
  seen: boolean;
}

export interface SeeArt {
  seeArt: SeeArt_seeArt | null;
}

export interface SeeArtVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArtType {
  Audio = "Audio",
  Image = "Image",
  Text = "Text",
  Video = "Video",
}

export interface LocationInput {
  lat: number;
  lng: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
