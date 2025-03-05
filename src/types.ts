export interface Place {
    latitude: number,
    longitude: number
}

export interface NamedLocation {
    id: number,
    name: string
}

export interface City extends Place, NamedLocation {
    country: string,
}

export interface CityCollectionResponse {
    data: City[]
}

export interface CityResponse {
    data: City
}



export interface WeatherInfo extends Place {
    utc_offset_seconds: number,
    timezone_abbreviation: string,
}



export interface CurrentWeatherInfo extends WeatherInfo {
    current_units: CurrentWeatherUnits,
    current: CurrentWeather
}

export interface CurrentWeatherUnits {
    time: string,
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
    time: string,
    interval: number,
    temperature_2m: number,
    relative_humidity_2m: number,
    apparent_temperature: number,
    precipitation: number,
    cloud_cover: number,
    wind_speed_10m: number,
    wind_direction_10m: number
}



export interface DailyWeatherInfo extends WeatherInfo {
    daily_units: DailyWeatherUnits,
    daily: DailyWeather
}

export interface DailyWeatherUnits {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    apparent_temperature_max: string
    apparent_temperature_min: string
    sunrise: string
    sunset: string
    uv_index_max: string
    precipitation_sum: string
    precipitation_probability_max: string
    wind_speed_10m_max: string
    wind_direction_10m_dominant: string
}

export interface DailyWeather {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    sunrise: string[]
    sunset: string[]
    uv_index_max: number[]
    precipitation_sum: number[]
    precipitation_probability_max: number[]
    wind_speed_10m_max: number[]
    wind_direction_10m_dominant: number[]
}



export interface HourlyWeatherInfo extends WeatherInfo {
    hourly_units: HourlyWeatherUnits,
    hourly: HourlyWeather
}

export interface HourlyWeatherUnits {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    dew_point_2m: string
    apparent_temperature: string
    precipitation_probability: string
    cloud_cover: string
    wind_speed_10m: string
    wind_direction_10m: string
    uv_index: string
}

export interface HourlyWeather {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    dew_point_2m: number[]
    apparent_temperature: number[]
    precipitation_probability: number[]
    cloud_cover: number[]
    wind_speed_10m: number[]
    wind_direction_10m: number[]
    uv_index: number[]
}