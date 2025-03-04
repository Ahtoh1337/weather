import { UseQueryResult } from "@tanstack/react-query";
import { DailyWeatherInfo } from "../types";
import { SunriseIcon, SunsetIcon, } from "../Icons/WeatherIcons";

export default function TodayWeatherForecast({ weather }: { weather: UseQueryResult<DailyWeatherInfo, Error> }) {
    const data = weather.isSuccess
        ? weather.data.daily
        : null!;
    
    return <div className="pb-3">
        <h2 className="text-2xl font-bold">
            Today
        </h2>
        <div className="flex flex-col py-4 px-2 gap-2
        bg-sky-900 rounded-md drop-shadow-md">
            {weather.isPending && <>...</>}
            {weather.isSuccess &&
                <>
                    <div className="flex items-center justify-around
                    border-b-1 border-sky-950/70 pb-3 pl-2">
                        <div className="text-4xl flex-1">
                            <span className="font-bold">
                                {data.temperature_2m_max[0]}
                            </span>
                            °/
                            <span className="font-bold">
                                {data.temperature_2m_min[0]}
                            </span>
                            °C
                        </div>
                        <div className="flex flex-col flex-1
                        items-center justify-center">
                            <div className="text-sm">
                                Apparent:
                            </div>
                            <div>
                                <span className="font-bold">
                                    {data.apparent_temperature_max[0]}
                                </span>
                                °/
                                <span className="font-bold">
                                    {data.apparent_temperature_min[0]}
                                </span>
                                °C
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around items-center px-10 py-1
                    border-b-1 border-sky-950/70">
                        <SunriseIcon value={data.sunrise[0]} />
                        <SunsetIcon value={data.sunset[0]} />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row" className="text-left py-1">☔️ Precipitation</th>
                                <td className="text-right">
                                    {data.precipitation_sum[0]} mm
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">🌧 Rain/Snowfall chance</th>
                                <td className="text-right">
                                    {data.precipitation_probability_max[0]}%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">☀️ UV Index</th>
                                <td className="text-right">
                                    {data.uv_index_max[0]}/11
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">💨 Max Wind</th>
                                <td className="text-right">
                                    {data.wind_speed_10m_max[0]} km/h,{" "}
                                    {data.wind_direction_10m_dominant[0]}°
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>}
        </div>
    </div>
}