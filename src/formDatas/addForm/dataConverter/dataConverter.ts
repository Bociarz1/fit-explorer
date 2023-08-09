export function dataConverter(data:any) {
  const newPlace = {
    position: {
      lat:data.lat,
      lng:data.lng
    },
    address: {
      country: data.country,
      street: data.street ?? '',
      nr: data.nr ?? '',
      postCode: data.postCode,
      region: data.region ?? '',
      city: data.city ?? '',
    },
    category:data.category.name,
    imgsUrl:data.placeImages,
    rating: {
      stars:0,
      voters: 0,
    },
    description: data.description
  }
  return newPlace
}