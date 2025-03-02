import { useCurrentWeather, useHourlyWeather, useDailyWeather } from "../hooks";
import { Place } from "../types";

export default function ForecastMain({ place }: { place: Place }) {
    const current = useCurrentWeather(place);
    const hourly = useHourlyWeather(place);
    const daily = useDailyWeather(place);

    return <div>
        <h1 className="text-3xl font-bold">Current</h1>
        <pre>
            {JSON.stringify(current, null, 2)}
        </pre>
        <h1 className="text-3xl font-bold">Hourly</h1>
        <pre>
            {JSON.stringify(hourly, null, 2)}
        </pre>
        <h1 className="text-3xl font-bold">Daily</h1>
        <pre>
            {JSON.stringify(daily, null, 2)}
        </pre>
    </div>
}