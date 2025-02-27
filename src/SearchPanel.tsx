import { useState } from "react";
import { NavLink } from "react-router";
import { useCitiesByName } from "./hooks";
import { City } from "./types";

export default function SearchPanel() {
    const [searchText, setSearchText] = useState("");

    const cities = useCitiesByName(searchText, 500);

    return (
        <>
            <div className="flex p-3 flex-col gap-1
                fixed w-full top-0 left-0">
                <input
                    className="p-2 flex-1
                bg-sky-900 rounded-md
                border-2 border-sky-600 focus:border-sky-400
                outline-none placeholder:text-sky-600"
                    type="search"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search..." />
                <div className={`bg-sky-900 rounded-md drop-shadow-lg
                ${searchText === "" ||
                        cities.isError ? " hidden" : ""}`}>
                    {cities.isPending && <div className="p-5 text-4xl flex items-center justify-center">
                        <div className="animate-spin">
                            🌀
                        </div>
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
        to={`find?name=${city.name}&id=${city.id}`}
        onClick={onClick}>
        {city.name}
        <span className="text-sky-300 font-normal">
            , {city.country}
        </span>
    </NavLink>
}