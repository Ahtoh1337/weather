import ForecastMain from "./Forecast/ForecastMain";
import { useUserCity } from "./hooks";

export default function UserCity() {
    const city = useUserCity();

    if (city.isPending)
        return <h1 className="m-3 p-5 text-xl text-center">
            ●●●
        </h1>

    if (city.isError)
        return <h1 className="m-3 p-5 text-xl text-center">
            Allow location access and refresh this page.
        </h1>

    return <ForecastMain place={city.data} />
}