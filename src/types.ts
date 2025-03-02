export interface Place {
    latitude: number,
    longitude: number
}

export interface City extends Place {
    id: number
    name?: string,
    country?: string,
}

export interface CurrentWeatherInfo extends Place {
    utc_offset_seconds: number,
    timezone_abbreviation: string,
    current_units: CurrentWeatherUnits,
    current: CurrentWeather
}

export interface CurrentWeatherUnits {
    interval: string,
    temperature_2m: string,
    relative_humidity_2m: string,
    apparent_temperature: string,
    precipitation: string,
    cloud_cover: string,
    wind_speed_10m: string,
    wind_direction_10m: string
}

export interface CurrentWeather {
    interval: number,
    temperature_2m: number,
    relative_humidity_2m: number,
    apparent_temperature: number,
    precipitation: number,
    cloud_cover: number,
    wind_speed_10m: number,
    wind_direction_10m: number
}

export interface CityCollectionResponse {
    data: City[]
}

export interface CityResponse {
    data: City
}