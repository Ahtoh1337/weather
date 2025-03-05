import { createContext, useContext, useEffect, useReducer } from "react";
import { NamedLocation } from "./types";

export type ColorTheme = "light" | "dark";

export interface Preferences {
    theme: ColorTheme
    savedLocations: NamedLocation[]
}

export type PreferencesReducerAction = {
    type: "changeTheme",
    nextTheme: ColorTheme
} | {
    type: "addLocation",
    location: NamedLocation
} | {
    type: "removeLocation",
    id: number
}



export const PreferencesContext = createContext<[Preferences, React.Dispatch<PreferencesReducerAction>]>(null!)



function preferencesReducer(state: Preferences, action: PreferencesReducerAction): Preferences {
    switch (action.type) {
        case "changeTheme": {
            return {
                ...state,
                theme: action.nextTheme
            }
        }
        case "addLocation": {
            if (state.savedLocations.find(l => l.id === action.location.id) !== undefined) {
                return state;
            } else return {
                ...state,
                savedLocations: [...state.savedLocations, action.location]
            }
        }
        case "removeLocation": {
            return {
                ...state,
                savedLocations: state.savedLocations.filter(l => l.id !== action.id)
            }
        }
        default: throw new Error("Unknown action");
    }
}



export function usePreferencesInit(): [Preferences, React.Dispatch<PreferencesReducerAction>] {
    const [state, dispatch] = useReducer(preferencesReducer, { theme: "light", savedLocations: [] } as Preferences, def => {
        const load = localStorage.getItem("Preferences");
        return load !== null ? JSON.parse(load) : def;
    })

    useEffect(() => {
        localStorage.setItem("Preferences", JSON.stringify(state));
        if (state.theme === "light")
            document.querySelector("body")?.classList.remove("dark")
        else
            document.querySelector("body")?.classList.add("dark")
    }, [state])

    return [state, dispatch];
}



export default function usePreferences() {
    return useContext(PreferencesContext);
}