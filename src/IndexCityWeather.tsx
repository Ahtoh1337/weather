import ForecastMain from "./ForecastMain";
import { useUserLocation } from "./hooks";

export default function IndexCityWeather() {
    const city = useUserLocation();

    if (city.isPending)
        return <h1>Loading...</h1>

    if (city.isError)
        return <h1>Error: {JSON.stringify(city.error)}</h1>

    return <ForecastMain city={city.data} />
}