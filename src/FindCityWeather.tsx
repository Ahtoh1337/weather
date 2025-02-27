import { useEffect } from "react";
import { useCityById } from "./hooks";
import { useNavigate, useParams } from "react-router";

export default function FindCity() {
    const navigate = useNavigate();
    const { id } = useParams();

    const city = useCityById(Number(id))

    useEffect(() => {
        if (city.isError) {
            navigate("/");
        }
    }, [id, city.isError])

    return <pre>
        {JSON.stringify(city, null, 2)}
    </pre>
}