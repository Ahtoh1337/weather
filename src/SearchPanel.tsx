import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useCitiesByName } from "./hooks";
import { City } from "./types";
import usePreferences from "./PreferencesContext";

export default function SearchPanel() {
    const [searchText, setSearchText] = useState("");

    const cities = useCitiesByName(searchText, 500);
    const navigate = useNavigate();
    const [prefs, dispatch] = usePreferences();

    return (
        <>
            <div className="flex  flex-col
                fixed z-10 w-full top-0 left-0">
                <div className="flex gap-2 px-3 pt-3
                bg-blue-200 dark:bg-sky-950">
                    <input
                        className="p-2 flex-1 rounded-md border-2
                bg-blue-300 dark:bg-sky-900
                border-blue-500 dark:border-sky-700
                focus:border-blue-700 dark:focus:border-sky-600
                outline-none"
                        type="search"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        onKeyDown={e => {
                            if (e.key !== "Enter")
                                return;

                            if (!cities.isSuccess)
                                return;

                            if (cities.data.data.length === 0)
                                return;


                            navigate(String(cities.data.data[0].id))
                            setSearchText("");
                            (e.target as HTMLElement).blur();
                        }}
                        placeholder="Search..." />
                    <button className="border-2 rounded-md
                    h-11 w-11 overflow-clip text-2xl
                    border-blue-500 dark:border-sky-700"
                        onClick={() => dispatch({
                            type: "changeTheme",
                            nextTheme: prefs.theme === "light" ? "dark" : "light"
                        })}>
                        {prefs.theme === "light" ? "🌞" : "🌚"}
                    </button>
                </div>
                <div className="rounded-md drop-shadow-lg mx-3
                bg-blue-400 dark:bg-sky-800
                data-[hidden=true]:hidden"
                    data-hidden={searchText === ""}>
                    {cities.isPending &&
                        <div className="text-center pb-4.5 pt-3 text-4xl">
                            <span className="inline-block animate-pulse
                            text-blue-600 dark:text-sky-200">
                                ●●●
                            </span>
                        </div>}

                    {cities.isSuccess && cities.data.data.map(c =>
                        <SearchListItem
                            key={c.id}
                            city={c}
                            onClick={() => setSearchText("")} />)}
                </div>
            </div>
        </>
    )
}

function SearchListItem({ city, onClick }:
    { city: City, onClick: () => void }) {
    return <NavLink className="block p-2.5 text-sm font-bold
        not-last:border-b-1
        border-blue-500 dark:border-sky-600"
        to={String(city.id)}
        onClick={onClick}>
        {city.name}
        <span className="text-blue-800 dark:text-sky-300 font-normal">
            , {city.country}
        </span>
    </NavLink>
}