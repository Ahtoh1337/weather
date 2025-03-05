import { City, Place } from "../types";

export default function PlaceInfo({ place }:
    { place: Place | City }) {
    const city = place as City;
    const location = city.name && city.country
        ? <>
            <span className="font-bold">
                {city.name}
            </span>
            , {city.country}
        </>
        : <>Unknown</>

    return <div className="text-lg py-2 mx-3">
        {location}
    </div>
}