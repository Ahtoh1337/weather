import { UseQueryResult } from "@tanstack/react-query";
import { CloudIcon, HumidityIcon, PrecipitationIcon, WindIcon } from "../Icons/WeatherIcons";
import { CurrentWeatherInfo } from "../types";
import { toShortTime } from "../utils";

export default function CurrentWeatherForecast({ weather }: { weather: UseQueryResult<CurrentWeatherInfo, Error> }) {

    return <div>
        <div className="flex justify-between items-baseline">
            <h2 className="text-2xl font-bold">
                Current
            </h2>
            <h2>
                {weather.isSuccess
                    ? <>As of {toShortTime(new Date(weather.data.current.time))}</>
                    : <>...</>}
            </h2>
        </div>
        <div className="grid grid-cols-4 p-4 gap-x-3 gap-y-5
        bg-sky-900 rounded-md">
            {weather.isPending && <>...</>}
            {weather.isSuccess && <>
                <div className="flex flex-col
                row-span-2 col-span-2
                items-center justify-center gap-1">
                    <div>
                        <span className="text-5xl ">
                            <span className="font-bold">
                                {weather.data.current.temperature_2m}
                            </span>
                            °C
                        </span>
                    </div>
                    <div>
                        Apparent:{" "}
                        <span className="font-bold">
                            {weather.data.current.apparent_temperature}
                        </span>
                        °C
                    </div>
                </div>
                <CloudIcon value={weather.data.current.cloud_cover} />
                <HumidityIcon value={weather.data.current.relative_humidity_2m} />
                <PrecipitationIcon value={weather.data.current.precipitation} />
                <WindIcon speed={weather.data.current.wind_speed_10m} direction={weather.data.current.wind_direction_10m} />
            </>}
        </div>
    </div>
}