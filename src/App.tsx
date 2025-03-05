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
        <SearchPanel />
            <div className="mt-12">
              <Routes>
                <Route path="/" element={<UserCity />} />
                <Route path=":id" element={<FindCity />} />
              </Routes>
            </div>
        </BrowserRouter>
      </PreferencesContext.Provider>
    </QueryClientProvider>
  )
}

export default App;