import { City } from "./types";

export default function ForecastMain({ city }: { city: City }) {
    return <h1>Your city: {city?.name ?? "Unknown"} ({city.id})</h1>
}