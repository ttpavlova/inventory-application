import { HomePage } from "./components/HomePage/HomePage";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shoes from "./components/Shoes/Shoes";
import Categories from "./components/Categories/Categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shoes" element={<Shoes />} />
          <Route path="categories" element={<Categories />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
