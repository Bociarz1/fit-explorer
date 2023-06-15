import { LatLngExpression } from "leaflet"

export interface MapDb {
  _id:string
  position: LatLngExpression
  category:string
  province:string
  city:string
  imgs:string[]
  rating: {
    userId:string
    comments: string
    stars:number
  }[]
  description: string
}

export const mapDb:MapDb[]= [
  {
    _id:'56456464456',
    position: [53.15180857473677, 23.118651387493237],
    category:'workout',
    province:'podlaskie',
    city:'bialystok',
    imgs:['imgs','imgs2'],
    rating: [{
      userId:'userId',
      comments: 'comments',
      stars:3
    }],
    description: 'description'
  }
]