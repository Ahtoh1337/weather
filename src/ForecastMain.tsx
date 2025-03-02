import { useCurrentWeather } from "./hooks";
import Icon from "./Icons/Icon";
import { City } from "./types";

export default function ForecastMain({ city }: { city: City }) {
    const weather = useCurrentWeather(city);

    if (weather.isPending)
        return <h1>Loading...</h1>

    if (weather.isError)
        return <h1>Error...</h1>

    return <div>
        <Icon icon="💧">
            {weather.data.current.relative_humidity_2m}
            {weather.data.current_units.relative_humidity_2m}
        </Icon>
        <pre>
            {JSON.stringify(weather.data, null, 2)}
        </pre>
    </div>
}