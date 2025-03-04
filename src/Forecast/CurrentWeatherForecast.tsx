import { UseQueryResult } from "@tanstack/react-query";
import { CloudIcon, HumidityIcon, PrecipitationIcon, WindIcon } from "../Icons/WeatherIcons";
import { CurrentWeatherInfo } from "../types";
import { toShortTime } from "../utils";

export default function CurrentWeatherForecast({ weather }: { weather: UseQueryResult<CurrentWeatherInfo, Error> }) {
    const data = weather.isSuccess
        ? weather.data.current
        : null!;

    return <>
        <div className="px-3 bg-sky-950 sticky top-13.5 z-5
        flex justify-between items-baseline">
            <h2 className="text-2xl font-bold">
                Current
            </h2>
            <h2>
                {weather.isSuccess
                    ? <>As of {toShortTime(new Date(data.time))}</>
                    : <>...</>}
            </h2>
        </div>
        <div className="flex py-4 px-2 m-3 mt-0
        bg-sky-900 rounded-md drop-shadow-md">
            {weather.isPending && <>...</>}
            {weather.isSuccess && <>
                <div className="flex flex-col flex-2
                row-span-2 col-span-2
                items-center justify-center gap-1">
                    <div>
                        <span className="text-5xl ">
                            <span className="font-bold">
                                {data.temperature_2m}
                            </span>
                            °C
                        </span>
                    </div>
                    <div>
                        Apparent:{" "}
                        <span className="font-bold">
                            {data.apparent_temperature}
                        </span>
                        °C
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4 flex-3">
                    <CloudIcon value={data.cloud_cover} />
                    <HumidityIcon value={data.relative_humidity_2m} />
                    <PrecipitationIcon value={data.precipitation} />
                    <WindIcon speed={data.wind_speed_10m} direction={data.wind_direction_10m} />
                </div>
            </>}
        </div>
    </>
}