import { UseQueryResult } from "@tanstack/react-query";
import { City, CurrentWeatherInfo, Place } from "../types";
import { offsetTime, toShortDate } from "../utils";

export default function PlaceInfo({ place, weather }:
    { place: Place | City, weather: UseQueryResult<CurrentWeatherInfo, Error> }) {
    const location = (place as City).id !== undefined
        ? <>
            <span className="font-bold">
                {(place as City).name}
            </span>
            , {(place as City).country}
        </>
        : <>Unknown</>

    return <div className="text-lg py-2">
        {location}
        ,{" "}
        {weather.isSuccess
            ? toShortDate(offsetTime(weather.data.utc_offset_seconds))
            : "..."}
    </div>
}