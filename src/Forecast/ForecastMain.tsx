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
        <PlaceInfo place={place} weather={currentWeather} />
        <CurrentWeatherForecast weather={currentWeather} />
        <TodayWeatherForecast weather={dailyWeather} />
        <DailyWeatherForecast weather={dailyWeather} />
        <HourlyWeatherForeceast weather={hourlyWeather} />
    </div>
}