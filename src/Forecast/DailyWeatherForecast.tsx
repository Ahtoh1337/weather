import { UseQueryResult } from "@tanstack/react-query";
import { DailyWeatherInfo, DailyWeather } from "../types";
import { useState } from "react";
import { toShortDateString } from "../utils";
import { PrecipitationProbIcon, SunriseIcon, SunsetIcon, UVIndexIcon, WindIcon } from "../Icons/WeatherIcons";

export default function DailyWeatherForecast({ weather }: { weather: UseQueryResult<DailyWeatherInfo, Error> }) {
    const [expand, setExpand] = useState<number | null>(null);

    const data = weather.isSuccess
        ? weather.data.daily
        : null;

    function handleItemToggle(index: number) {
        if (expand === index) {
            setExpand(null);
        } else {
            setExpand(index);
        }
    }

    return <>
        <h2 className="px-3 pt-1 sticky top-13.5 z-5
        text-2xl font-bold
        bg-blue-200 dark:bg-sky-950">
            Daily
        </h2>
        <div className="bg-blue-300 dark:bg-sky-900 rounded-md m-3 mt-0">
            {weather.isPending && <>...</>}
            {weather.isSuccess && data?.time.map((t, i) => {
                if (i === 0)
                    return null;
                return <DailyListItem
                    key={t}
                    index={i}
                    data={data}
                    isOpen={i === expand}
                    onItemToggle={() => handleItemToggle(i)} />
            })}
        </div>
    </>
}

export type WeatherListItemProps<T> = {
    data: T,
    index: number,
    isOpen: boolean,
    onItemToggle: () => void
}

function DailyListItem({ data, index, isOpen, onItemToggle }: WeatherListItemProps<DailyWeather>) {
    return <>
        <button className="w-full flex px-2 py-2 gap-3"
            onClick={onItemToggle}>
            <div className="flex-3 text-left font-bold">
                {toShortDateString(new Date(data.time[index]))}
            </div>
            <div className="flex-3 text-left">
                <span className="font-bold">
                    {data.temperature_2m_max[index]}
                </span>
                °/
                <span className="font-bold">
                    {data.temperature_2m_min[index]}
                </span>
                °C
            </div>
            <div className="flex-2">
                <PrecipitationProbIcon value={data.precipitation_probability_max[index]} vertical={false} />
            </div>
        </button>
        {isOpen && <div className="bg-blue-400/50 dark:bg-sky-800 py-1 last:rounded-b-md">
            <div className="flex items-center pb-1">
                <WindIcon speed={data.wind_speed_10m_max[index]}
                    direction={data.wind_direction_10m_dominant[index]} />
                <div className="flex flex-col flex-1
                        items-center justify-center text-sm">
                    <div>
                        Apparent:
                    </div>
                    <div>
                        <span className="font-bold">
                            {data.apparent_temperature_max[index]}
                        </span>
                        °/
                        <span className="font-bold">
                            {data.apparent_temperature_min[index]}
                        </span>
                        °C
                    </div>
                </div>
                <UVIndexIcon value={data.uv_index_max[index]} />
            </div>
            <div className="flex items-center pt-2 px-8 mx-2
            border-t-1 border-blue-500 dark:border-sky-900">
                <SunriseIcon value={data.sunrise[index]} />
                <SunsetIcon value={data.sunset[index]} />
            </div>
        </div>}
    </>
}