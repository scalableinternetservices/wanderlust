import { Location } from 'server/src/graphql/schema.types'

export function marshalLocation(loc: Location): string {
  return `${loc.lat}, ${loc.lng}`
}
export function unmarshalLocation(point: string): Location {
  // This is my tired solution to this.
  if (!point)
    return {
      lat: 0,
      lng: 0,
    }
  const regex = /\d+\.?\d*/g
  const nums = point.match(regex)?.map(el => parseFloat(el))
  if (!nums) {
    // TODO: Actually handle error
    return {
      lat: 0,
      lng: 0,
    }
  }
  const response: Location = {
    lat: nums[0],
    lng: nums[1],
  }
  return response
}
