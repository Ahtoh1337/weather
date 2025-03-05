import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import UserCity from "./UserCity";
import FindCity from "./FindCity";
import SearchPanel from "./SearchPanel";
import { PreferencesContext, usePreferencesInit } from "./PreferencesContext";

const queryClient = new QueryClient();

function App() {
  const preferences = usePreferencesInit();

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesContext.Provider value={preferences}>
        <BrowserRouter>
          <div className={`min-h-[100vh] min-w-full pb-0.5
          bg-sky-500 text-sky-50
          dark:bg-sky-950 dark:text-sky-100
          ${preferences[0].theme === "dark" ? "dark" : ""}`}>
            <SearchPanel />
            <div className="mt-12">
              <Routes>
                <Route path="/" element={<UserCity />} />
                <Route path=":id" element={<FindCity />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </PreferencesContext.Provider>
    </QueryClientProvider>
  )
}

export default App;