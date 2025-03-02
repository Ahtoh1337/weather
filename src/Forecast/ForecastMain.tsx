import { useCurrentWeather, useHourlyWeather, useDailyWeather } from "../hooks";
import { City, Place } from "../types";
import { toShortDate } from "../utils";
import CurrentWeatherForecast from "./CurrentWeatherForecast";
import PlaceInfo from "./PlaceInfo";

export default function ForecastMain({ place }: { place: Place | City }) {
    const currentWeather = useCurrentWeather(place);
    const hourly = useHourlyWeather(place);
    const daily = useDailyWeather(place);



    return <div className="p-3">
        <PlaceInfo place={place} weather={currentWeather} />
        <CurrentWeatherForecast weather={currentWeather} />
    </div>
}