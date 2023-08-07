import { LatLngExpression } from "leaflet"

export interface Place {
  id?:string
  position: {
    lat:number
    lng:number
  },
  adress: {
    country: string
    street: string
    nr: string
    postCode: string
    region: string
    city: string
  },
  category:string
  imgsUrl:string[]
  rating: {
    stars:number
    voters: number
  },
  description: string
}