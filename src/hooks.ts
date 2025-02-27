import { useQuery } from "@tanstack/react-query";
import { wait, toIsoCoord } from "./utils";
import { CityResponse } from "./types";

export function useCitiesByName(namePrefix: string, waitTime: number = 0) {
    return useQuery({
        queryKey: ["cities", namePrefix.toLowerCase().trim().replace(/\s+/g, "%20")],
        queryFn: async ({ signal }) => {
            const str = namePrefix.trim();
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

            return await response.json() as CityResponse;
        }
    });
}

export function useUserLocation() {
    return useQuery({
        queryKey: ["userLocation"],
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

                const result = await response.json() as CityResponse;

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