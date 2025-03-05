import { useCurrentWeather, useHourlyWeather, useDailyWeather } from "../hooks";
import { City, Place } from "../types";
import CurrentWeatherForecast from "./CurrentWeatherForecast";
import DailyWeatherForecast from "./DailyWeatherForecast";
import HourlyWeatherForeceast from "./HourlyWeatherForecast";
import PlaceInfo from "./PlaceInfo";
import TodayWeatherForecast from "./TodayWeatherForecast";

export default function ForecastMain({ place }: { place: Place | City }) {
    const currentWeather = useCurrentWeather(place);
    const hourlyWeather = useHourlyWeather(place);
    const dailyWeather = useDailyWeather(place);



    return <div className="pt-3">
        <PlaceInfo place={place} />
        <div className="sm:grid grid-cols-5">
            <CurrentWeatherForecast weather={currentWeather} />
            <TodayWeatherForecast weather={dailyWeather} />
        </div>
        <DailyWeatherForecast weather={dailyWeather} />
        <HourlyWeatherForeceast weather={hourlyWeather} />
    </div>
}