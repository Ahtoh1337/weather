import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import UserCity from "./UserCity";
import FindCity from "./FindCity";
import SearchPanel from "./SearchPanel";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SearchPanel />
        <div className="mt-12">
          <Routes>
            <Route path="/" element={<UserCity />} />
            <Route path=":id" element={<FindCity />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;