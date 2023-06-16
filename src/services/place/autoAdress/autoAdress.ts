export interface Address {
  country: string;
  street: string;
  nr: string;
  postCode: string;
  region: string;
  city: string;
}

export default async function autoAddress(
  lat: number,
  lng: number
): Promise<Address | {errorMessage:string}> {
  const apiKey = "d337b5cd0aaf420aafc758a75ee3a3fd";

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const adress: Address = {
      country: data.features[0].properties.country,
      street: data.features[0].properties.street,
      nr: data.features[0].properties.housenumber,
      postCode: data.features[0].properties.postcode,
      region: data.features[0].properties.region,
      city: data.features[0].properties.city,
    };
    return adress;
  } catch (error) {
    const res = {errorMessage:"Problem with fetching data from Geoapify"}
    return res;
  }
}
