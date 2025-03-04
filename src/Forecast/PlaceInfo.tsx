import { UseQueryResult } from "@tanstack/react-query";
import { City, CurrentWeatherInfo, Place } from "../types";
import { offsetTime, toAltDateString } from "../utils";

export default function PlaceInfo({ place, weather }:
    { place: Place | City, weather: UseQueryResult<CurrentWeatherInfo, Error> }) {
    const city = place as City;
    const location = city.name && city.country
        ? <>
            <span className="font-bold">
                {city.name}
            </span>
            , {city.country}
        </>
        : <>Unknown</>

    return <div className="text-lg py-2 mx-3">
        {location}
        ,{" "}
        {weather.isSuccess
            ? toAltDateString(offsetTime(weather.data.utc_offset_seconds))
            : "..."}
    </div>
}