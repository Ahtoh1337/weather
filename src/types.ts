export interface City {
    id: number
    name?: string,
    country?: string,
    latitude: number,
    longitude: number,
}

export interface CityResponse {
    data: City[]
}