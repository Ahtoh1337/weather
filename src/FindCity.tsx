import { useEffect } from "react";
import { useCityById } from "./hooks";
import { useNavigate, useParams } from "react-router";
import ForecastMain from "./Forecast/ForecastMain";

export default function FindCity() {
    const navigate = useNavigate();
    const { id } = useParams();

    const city = useCityById(Number(id))

    useEffect(() => {
        if (city.isError) {
            navigate("/");
        }
    }, [id, city.isError])

    if (city.isPending)
        return <h1 className="m-3 p-5 text-xl text-center">
            ●●●
        </h1>

    if (city.isError)
        return <h1 className="m-3 p-5 text-xl text-center">
            Error
        </h1>

    return <ForecastMain place={city.data.data} />
}