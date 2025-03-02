import ForecastMain from "./Forecast/ForecastMain";
import { useUserCity } from "./hooks";

export default function UserCity() {
    const city = useUserCity();

    if (city.isPending)
        return <h1>Loading...</h1>

    if (city.isError)
        return <h1>Error: {JSON.stringify(city.error)}</h1>

    return <ForecastMain place={city.data} />
}