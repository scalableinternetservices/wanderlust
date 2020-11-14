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
  name: string;
  location: FetchNearbyMap_nearby_location;
}

export interface FetchNearbyMap {
  nearby: FetchNearbyMap_nearby[];
}

export interface FetchNearbyMapVariables {
  loc: LocationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchArtwork
// ====================================================

export interface FetchArtwork_nearby_location {
  __typename: "Location";
  lat: number;
  lng: number;
}

export interface FetchArtwork_nearby {
  __typename: "Art";
  id: number;
  name: string;
  location: FetchArtwork_nearby_location;
}

export interface FetchArtwork {
  nearby: FetchArtwork_nearby[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LocationInput {
  lat: number;
  lng: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
