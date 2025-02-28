import { useCurrentWeather } from "./hooks";
import { City } from "./types";

export default function ForecastMain({ city }: { city: City }) {
    const weather = useCurrentWeather(city);

    if (weather.isPending)
        return <h1>Loading...</h1>

    if (weather.isError)
        return <h1>Error...</h1>

    return <pre>
        {JSON.stringify(weather.data, null, 2)}
    </pre>
}