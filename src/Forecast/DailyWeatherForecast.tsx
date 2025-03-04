import { UseQueryResult } from "@tanstack/react-query";
import { DailyWeatherInfo, DailyWeather } from "../types";
import { useState } from "react";
import { toAltDateString, toShortDateString } from "../utils";
import { PrecipitationIcon, PrecipitationProbIcon, SunriseIcon, SunsetIcon, UVIndexIcon, WindIcon } from "../Icons/WeatherIcons";

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

    return <div className="pb-3">
        <h2 className="text-2xl font-bold">
            Daily
        </h2>
        <div className="bg-sky-900 rounded-md drop-shadow-md">
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
    </div>
}

function DailyListItem({ data, index, isOpen, onItemToggle }:
    { data: DailyWeather, index: number, isOpen: boolean, onItemToggle: () => void }) {
    return <div className="group">
        <button className="w-full flex px-2 py-2"
            onClick={onItemToggle}>
            <div className="flex-1 text-left font-bold">
                {toShortDateString(new Date(data.time[index]))}
            </div>
            <div className="flex-1">
                <span className="font-bold">
                    {data.temperature_2m_max[index]}
                </span>
                °/
                <span className="font-bold">
                    {data.temperature_2m_min[index]}
                </span>
                °C
            </div>
            <PrecipitationProbIcon value={data.precipitation_probability_max[index]} vertical={false} />
        </button>
        <div className="bg-sky-800 py-1 group-last:rounded-b-md
            data-[hidden=true]:hidden"
            data-hidden={!isOpen}>
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
            border-t-1 border-sky-900">
                <SunriseIcon value={data.sunrise[index]} />
                <SunsetIcon value={data.sunset[index]} />
            </div>
        </div>
    </div>
}