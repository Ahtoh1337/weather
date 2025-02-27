import { useCitiesByName } from "./hooks";
import ForecastMain from "./ForecastMain";
import { toIsoCoord } from "./utils";
import { useSearchParams } from "react-router";
import { City } from "./types";

export default function FindCity() {
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name") ?? "";
    const id = searchParams.get("id");

    const cities = useCitiesByName(name);

    let match: City | undefined = undefined;

    if (cities.isSuccess && id)
        match = cities.data.data.find(c => String(c.id) === id)

    if (cities.isPending)
        return <h1>Loading...</h1>

    if (cities.isError)
        return <h1>Error: {JSON.stringify(cities.error)}</h1>

    if (match)
        return <div>
            <h1>Main match</h1>
            <ForecastMain city={match} />
        </div>


    return <div>
        <h1>All matches</h1>
        {cities.data.data.map(c => <ForecastMain key={`${toIsoCoord(c.latitude)}${toIsoCoord(c.longitude)}`} city={c} />)}
    </div>
}