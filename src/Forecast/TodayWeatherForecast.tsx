import { UseQueryResult } from "@tanstack/react-query";
import { DailyWeatherInfo } from "../types";
import { PrecipitationIcon, PrecipitationProbIcon, SunriseIcon, SunsetIcon, UVIndexIcon, WindIcon } from "../Icons/WeatherIcons";

export default function TodayWeatherForecast({ weather }: { weather: UseQueryResult<DailyWeatherInfo, Error> }) {

    return <div>
        <div className="text-2xl font-bold">
            Today
        </div>
        <div className="flex flex-col py-4 px-2 gap-2
        bg-sky-900 rounded-md drop-shadow-md">
            {weather.isPending && <>...</>}
            {weather.isSuccess &&
                <>
                    <div className="flex items-center justify-around
                    border-b-1 border-sky-950/70 pb-2 pl-2">
                        <div className="text-4xl flex-1">
                            <span className="font-bold">
                                {weather.data.daily.temperature_2m_max[0]}
                            </span>
                            °/
                            <span className="font-bold">
                                {weather.data.daily.temperature_2m_min[0]}
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
                                    {weather.data.daily.apparent_temperature_max[0]}
                                </span>
                                °/
                                <span className="font-bold">
                                    {weather.data.daily.apparent_temperature_min[0]}
                                </span>
                                °C
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around items-center px-10 py-1
                    border-b-1 border-sky-950/70">
                        <SunriseIcon value={weather.data.daily.sunrise[0]} />
                        <SunsetIcon value={weather.data.daily.sunset[0]} />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th scope="row" className="text-left py-1">☔️ Precipitation</th>
                                <td className="text-right">
                                    {weather.data.daily.precipitation_sum[0]} mm
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">🌧 Rain/Snowfall chance</th>
                                <td className="text-right">
                                    {weather.data.daily.precipitation_probability_max[0]}%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">☀️ UV Index</th>
                                <td className="text-right">
                                    {weather.data.daily.uv_index_max[0]}/11
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-left py-1">💨 Wind</th>
                                <td className="text-right">
                                    {weather.data.daily.wind_speed_10m_max[0]} km/h,{" "}
                                    {weather.data.daily.wind_direction_10m_dominant[0]}°
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>}
        </div>
    </div>
}