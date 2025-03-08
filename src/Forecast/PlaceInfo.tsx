import usePreferences from "../PreferencesContext";
import { City, Place } from "../types";

export default function PlaceInfo({ place }:
    { place: Place | City }) {

    const [prefs, dispatch] = usePreferences();

    const isCity = "id" in place;

    const isSaved: boolean = isCity
        && prefs.savedLocations.findIndex(l => l.id === place.id) !== -1;

    function handleSaveButtonClick(c: City) {
        if (isSaved) {
            dispatch({
                type: "removeLocation",
                id: c.id
            })
        } else {
            dispatch({
                type: "addLocation",
                location: {
                    id: c.id,
                    name: c.name
                }
            })
        }
    }

    return <div className="text-lg py-2 mx-3">
        {isCity ? <>
            <button className="outline-2 outline-blue-300 data-[saved=true]:outline-blue-400
            dark:outline-sky-800 data-[saved=true]:dark:outline-sky-700
            h-7 w-7 rounded-md
            data-[saved=false]:text-white/50
            sm:active:bg-blue-400 sm:active:outline-blue-400 sm:hover:bg-blue-300
            dark:sm:active:bg-sky-700 dark:sm:active:outline-sky-700 dark:sm:hover:bg-sky-800/50"
                data-saved={isSaved}
                onClick={() => handleSaveButtonClick(place)}>
                ⭐️
            </button>{" "}
            <span className="font-bold">
                {place.name}
            </span>
            , {place.country}
        </>
            : <>Unknown</>}
    </div>
}