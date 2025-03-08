import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useCitiesByName } from "./hooks";
import { City } from "./types";

type SearchPanelProps = {
    showSidebar: boolean,
    setShowSidebar: (value: boolean) => void
}

export default function SearchPanel({ showSidebar, setShowSidebar }: SearchPanelProps) {
    const [searchText, setSearchText] = useState("");

    const cities = useCitiesByName(searchText, 500);
    const navigate = useNavigate();

    return (
        <>
            <div className="fixed z-10 w-full top-0 left-0">
                <div className="flex gap-2 px-3 pt-3
                bg-blue-200 dark:bg-sky-950
                sm:max-w-200 sm:mx-auto">
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
                    h-11 w-11 overflow-clip
                    text-5xl leading-0 font-bold
                    border-blue-500 dark:border-sky-700 xl:hidden"
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowSidebar(!showSidebar)
                        }}>
                        {showSidebar ? "×" : "="}
                    </button>
                </div>
                <div className="data-[hidden=true]:hidden px-3
                sm:max-w-200 sm:mx-auto"
                    data-hidden={searchText === ""}>
                    <div className="rounded-md drop-shadow-lg
                bg-blue-300 dark:bg-sky-800">
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
            </div>
        </>
    )
}

function SearchListItem({ city, onClick }:
    { city: City, onClick: () => void }) {
    return <NavLink className="block p-2.5 text-sm font-bold
        not-last:border-b-1
        border-blue-400 dark:border-sky-600"
        to={String(city.id)}
        onClick={onClick}>
        {city.name}
        <span className="text-blue-800 dark:text-sky-300 font-normal">
            , {city.country}
        </span>
    </NavLink>
}