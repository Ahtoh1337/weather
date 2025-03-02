import { useQuery } from "@tanstack/react-query";
import { wait, toIsoCoord } from "./utils";
import { CityCollectionResponse, CityResponse, CurrentWeatherInfo, DailyWeatherInfo, HourlyWeatherInfo, Place } from "./types";

export function useCitiesByName(namePrefix: string, waitTime: number = 0) {
    return useQuery({
        queryKey: ["cities", namePrefix.toLowerCase().trim().replace(/\s+/g, "%20")],
        queryFn: async ({ signal, queryKey }) => {
            const str = queryKey[1];
            if (str === "")
                return { data: [] };

            const paramString = [
                `namePrefix=${str}`,
                "types=city",
                "sort=-population,+name",
                "limit=5",
                "offset=0"
            ].join("&");

            await wait(waitTime);

            const response = await fetch(`${import.meta.env.VITE_CITY_API}/geo/cities?${paramString}`,
                {
                    signal
                }
            );

            if (!response.ok)
                throw new Error(`Network error (${response.status} ${response.statusText})`);

            return await response.json() as CityCollectionResponse;
        }
    });
}

export function useCityById(id: number) {
    return useQuery({
        queryKey: ["cityId", id],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(`${import.meta.env.VITE_CITY_API}/geo/places/${queryKey[1]}`);

            if (!response.ok)
                throw new Error(`Network error (${response.status} ${response.statusText})`);

            return await response.json() as CityResponse;
        },
        retry: false
    })
}

export function useUserCity() {
    return useQuery({
        queryKey: ["userCity"],
        queryFn: async () => {
            return new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(data => resolve(data), error => reject(error));
            }).then(async ({ coords }) => {

                const paramString = [
                    "limit=1",
                    "offset=0",
                    "types=CITY",
                    "radius=20",
                    "sort=-population",
                    `location=${toIsoCoord(coords.latitude)}${toIsoCoord(coords.longitude)}`
                ].join("&")

                const response = await fetch(`${import.meta.env.VITE_CITY_API}/geo/places?${paramString}`);

                if (!response.ok)
                    throw new Error(`Network error (${response.status} ${response.statusText})`);

                const result = await response.json() as CityCollectionResponse;

                if (result.data.length === 0) {
                    return {
                        id: -1,
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }
                }

                return result.data[0];
            })
        },
        retry: false
    });
}

export function useCurrentWeather(place: Place) {
    return useQuery({
        queryKey: ["current", place.latitude, place.longitude],
        queryFn: async ({ queryKey }) => {
            const paramString = [
                `latitude=${queryKey[1]}`,
                `longitude=${queryKey[2]}`,
                "current=" + [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "precipitation",
                    "cloud_cover",
                    "wind_speed_10m",
                    "wind_direction_10m"
                ].join(","),
                "timezone=auto"
            ].join("&")

            const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/forecast?${paramString}`);

            if (!response.ok)
                throw new Error(`Network error (${response.status} ${response.statusText})`);

            return await response.json() as CurrentWeatherInfo;
        },
        refetchInterval: 900_000
    })
}

export function useDailyWeather(place: Place) {
    return useQuery({
        queryKey: ["daily", place.latitude, place.longitude],
        queryFn: async ({ queryKey }) => {
            const paramString = [
                `latitude=${queryKey[1]}`,
                `longitude=${queryKey[2]}`,
                "daily=" + [
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "apparent_temperature_max",
                    "apparent_temperature_min",
                    "sunrise",
                    "sunset",
                    "uv_index_max",
                    "precipitation_sum",
                    "precipitation_probability_max",
                    "wind_speed_10m_max",
                    "wind_direction_10m_dominant"
                ].join(","),
                "timezone=auto"
            ].join("&")

            const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/forecast?${paramString}`);

            if (!response.ok)
                throw new Error(`Network error (${response.status} ${response.statusText})`);

            return await response.json() as DailyWeatherInfo;
        }
    });
}

export function useHourlyWeather(place: Place) {
    return useQuery({
        queryKey: ["hourly", place.latitude, place.longitude],
        queryFn: async ({ queryKey }) => {
            const paramString = [
                `latitude=${queryKey[1]}`,
                `longitude=${queryKey[2]}`,
                "hourly=" + [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "dew_point_2m",
                    "apparent_temperature",
                    "precipitation_probability",
                    "cloud_cover",
                    "wind_speed_80m",
                    "wind_direction_80m",
                    "uv_index",
                ].join(","),
                "timezone=auto",
                "forecast_days=3"
            ].join("&");

            const response = await fetch(`${import.meta.env.VITE_WEATHER_API}/forecast?${paramString}`);

            if (!response.ok)
                throw new Error(`Network error (${response.status} ${response.statusText})`);

            return await response.json() as HourlyWeatherInfo;
        }
    })
}