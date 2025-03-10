import { UseQueryResult } from "@tanstack/react-query";
import { HourlyWeather, HourlyWeatherInfo } from "../types";
import { Fragment, useState } from "react";
import { WeatherListItemProps } from "./DailyWeatherForecast";
import { groupBy, toShortDateString, toShortTime } from "../utils";
import { CloudIcon, PrecipitationProbIcon, WindText } from "../Icons/WeatherIcons";

export default function HourlyWeatherForeceast({ weather }: { weather: UseQueryResult<HourlyWeatherInfo, Error> }) {
    const [expand, setExpand] = useState<number | null>(null);

    const data = weather.isSuccess
        ? weather.data.hourly
        : null!;

    const timeGroup = groupBy(data?.time ?? [],
        t => toShortDateString(new Date(t)));

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
            Hourly
        </h2>
        <div className="rounded-md m-3 mt-0 overflow-clip
        bg-blue-300 dark:bg-sky-900">
            {weather.isPending && <>...</>}
            {weather.isSuccess && Object.keys(timeGroup).map(k => {
                return <Fragment key={k}>
                    <h2 className='font-bold text-lg p-1.5 pb-1
                        sticky top-22.5
                        bg-blue-400 dark:blend'>
                        {k}
                    </h2>
                    {timeGroup[k].filter(t => new Date(t[1]) > new Date()).map(t => {
                        return <HourlyListItem
                            key={t[1]}
                            index={t[0]}
                            data={data}
                            isOpen={t[0] === expand}
                            onItemToggle={() => handleItemToggle(t[0])} />
                    })}
                </Fragment>
            }
            )}
        </div>
    </>
}

function HourlyListItem({ index, data, isOpen, onItemToggle }: WeatherListItemProps<HourlyWeather>) {
    return <>
        <button className="w-full flex px-2 py-2 gap-2
        outline-none
        sm:hover:bg-blue-400/30 sm:dark:hover:bg-sky-950/20
        sm:active:bg-blue-400/50
        sm:active:dark:bg-sky-950/40"
            onClick={onItemToggle}>
            <div className="flex-1 text-left font-bold">
                {toShortTime(new Date(data.time[index]))}
            </div>
            <div className="flex-1 text-left">
                <span className="font-bold">
                    {data.temperature_2m[index]}
                </span>
                °C
            </div>
            <CloudIcon value={data.cloud_cover[index]}
                vertical={false} />
            <PrecipitationProbIcon value={data.precipitation_probability[index]}
                vertical={false} />
        </button>
        {isOpen && <div className="py-1 px-2 last:rounded-b-md
        bg-blue-400/50 dark:bg-sky-800">
            <table className="w-full">
                <tbody className="text-sm">
                    <tr>
                        <th scope="row" className="text-left py-1">
                            🌡 Apparent Temperature
                        </th>
                        <td className="text-right">
                            <span className="font-bold">
                                {data.apparent_temperature[index]}
                            </span>
                            °C
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="text-left py-1">
                            💧 Humidity
                        </th>
                        <td className="text-right">
                            {data.relative_humidity_2m[index]}
                            %
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="text-left py-1">
                            ☀️ UV Index
                        </th>
                        <td className="text-right">
                            {data.uv_index[index]}/11
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" className="text-left py-1">
                            💨 Wind
                        </th>
                        <td className="text-right">
                            <WindText speed={data.wind_speed_10m[index]}
                                direction={data.wind_direction_10m[index]} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>}
    </>
}