export interface City {
    id: number
    name?: string,
    country?: string,
    latitude: number,
    longitude: number,
}

export interface CityCollectionResponse {
    data: City[]
}

export interface CityResponse {
    data: City
}