import { forwardRef } from "react"
import usePreferences from "./PreferencesContext"
import { NavLink } from "react-router"

type SidebarProps = {
    show: boolean
    setShow: (value: boolean) => void
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function ({ show, setShow }: SidebarProps, ref) {
    const [prefs, dispatch] = usePreferences();

    return <div ref={ref} data-show={show}
        className="fixed top-0 right-0 w-55 h-[100vh] xl:h-auto z-9
        flex flex-col bg-linear-to-l
        bg-blue-300 to-blue-400/70
        dark:bg-sky-800 dark:to-transparent
        data-[show=false]:-right-55
        transition-[right]
        xl:absolute xl:-right-55
        xl:to-transparent xl:bg-blue-200 dark:xl:bg-sky-950
        xl:transition-none">
        <div className="bg-blue-200 dark:bg-sky-950 h-17 flex-none xl:h-14" />
        <div className="p-2 flex gap-1 items-center text-xl
        justify-center xl:justify-start">
            🌞
            <button className="relative border-2 rounded-full
            border-blue-500 dark:border-sky-950 xl:dark:border-sky-800
            lg:hover:bg-blue-300/50 dark:hover:lg:bg-sky-900/50
            w-13 h-7 text-xl"
                onClick={() => {
                    dispatch({
                        type: "changeTheme",
                        nextTheme: prefs.theme === "light" ? "dark" : "light"
                    })
                }}>
                <div className="block h-5 w-5 rounded-full 
                bg-blue-500 dark:bg-sky-950 xl:dark:bg-sky-800
                absolute top-0.5 left-0.5 dark:left-6.5 transition-all" />
            </button>
            🌚
        </div>
        <ul className="overflow-y-auto">
            {prefs.savedLocations.length === 0
                ? <p className="p-3 text-sm text-sky-300">
                    You have no saved cities...
                </p>
                : prefs.savedLocations.slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(l => <NavLink className="block overflow-clip
                        pl-4 py-1.5 font-bold text-lg lg:hover:underline
                        text-blue-800 xl:text-blue-500/80 dark:text-sky-200 xl:dark:text-sky-300/50"
                        key={l.id} to={String(l.id)}
                        onClick={() => setShow(false)}>
                        {l.name}
                    </NavLink>)}
        </ul>
    </div>
})

export default Sidebar;