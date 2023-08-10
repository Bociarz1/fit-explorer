import { LatLngExpression } from "leaflet"

export interface ProposalPlaceInterface {
  id?:string
  editorInfo: {
    id: string
    userName: string,
    email: string,
    avatarUrl: string,
  },
  position: {
    lat:number
    lng:number
  },
  address: {
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