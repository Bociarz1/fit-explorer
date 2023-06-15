import { LatLngExpression } from "leaflet"

export interface Place {
  id?:string
  position: LatLngExpression | {lat:number,lng:number}
  adress: {
    street:string
    nr:string
  }
  category:string
  province:string
  city:string
  imgsUrl:string[]
  rating: {
    stars:number
    voters: number
  },
  description: string
}