import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import UserCity from "./UserCity";
import FindCity from "./FindCity";
import SearchPanel from "./SearchPanel";
import { PreferencesContext, usePreferencesInit } from "./PreferencesContext";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

const queryClient = new QueryClient();

function App() {
  const preferences = usePreferencesInit();

  const [showSidebar, setShowSidebar] = useState(false);
  let sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleSidebarHiding(e: MouseEvent) {

      if (!sidebarRef.current?.contains(e.target as Node)) {
        setShowSidebar(false);
      }
    }

    document.addEventListener("click", handleSidebarHiding);
    return () => document.removeEventListener("click", handleSidebarHiding);
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <PreferencesContext.Provider value={preferences}>
        <BrowserRouter>
          <SearchPanel showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="relative mt-12 sm:max-w-200 sm:mx-auto">
            <Sidebar show={showSidebar} setShow={setShowSidebar} ref={sidebarRef} />
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