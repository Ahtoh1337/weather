import { useState } from "react";
import { NavLink } from "react-router";
import { useCitiesByName } from "./hooks";
import { City } from "./types";

export default function SearchPanel() {
    const [searchText, setSearchText] = useState("");

    const cities = useCitiesByName(searchText, 500);

    return (
        <>
            <div className="flex px-3 pt-3 flex-col bg-sky-950
                fixed z-10 w-full top-0 left-0">
                <input
                    className="p-2 flex-1
                bg-sky-900 rounded-md
                border-2 border-sky-600 focus:border-sky-400
                outline-none"
                    type="search"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search..." />
                <div className="bg-sky-900 rounded-md drop-shadow-lg hidden data-[show=true]:static"
                    data-show={searchText !== ""}>
                    {cities.isPending &&
                        <div className="text-center pb-4.5 pt-3 text-4xl">
                            <span className="inline-block text-sky-50/70 animate-pulse">
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

function SearchListItem({ city, onClick }: { city: City, onClick: () => void }) {
    return <NavLink className="block p-2.5 text-sm font-bold
        not-last:border-b-1 border-sky-600"
        to={String(city.id)}
        onClick={onClick}>
        {city.name}
        <span className="text-sky-300 font-normal">
            , {city.country}
        </span>
    </NavLink>
}