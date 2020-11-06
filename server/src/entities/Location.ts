import { Column } from "typeorm";
export class Location {
  @Column()
  lat: number
  @Column()
  lng: number
}
