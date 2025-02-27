import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import IndexCityWeather from "./IndexCityWeather";
import FindCity from "./FindCityWeather";
import SearchPanel from "./SearchPanel";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SearchPanel />
        <div className="mt-17 bg-sky-900">
          <Routes>
            <Route path="/" element={<IndexCityWeather />} />
            <Route path=":id" element={<FindCity />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
