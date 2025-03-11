import { useCityById } from "./hooks";
import { useParams } from "react-router";
import ForecastMain from "./Forecast/ForecastMain";

export default function FindCity() {
    const { id } = useParams();

    const city = useCityById(Number(id))

    if (city.isSuccess)
        return <ForecastMain place={city.data.data} />

    if (city.isPending || city.isFetching)
        return <h1 className="m-3 p-5 text-xl text-center">
            ●●●
        </h1>

    if (city.isError)
        return <h1 className="m-3 p-5 text-xl text-center">
            Something went wrong.
        </h1>
}