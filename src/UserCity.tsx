import ForecastMain from "./Forecast/ForecastMain";
import { useUserCity } from "./hooks";

export default function UserCity() {
    const city = useUserCity();

    if (city.isPending)
        return <h1 className="m-3 p-5 text-xl text-center">
            ●●●
        </h1>

    if (city.isError)
        return <div className="m-3 p-5">
            <h1 className="text-xl">
                Allow location access and refresh this page.
            </h1>
            <p className="text-sky-200 mt-2">
                Or enter your city above.
            </p>
        </div>

    return <ForecastMain place={city.data} />
}