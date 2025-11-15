import { HomePage } from "./components/HomePage/HomePage";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shoes from "./components/Shoes/Shoes";
import Categories from "./components/Categories/Categories";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ShoeDetails } from "./components/Shoes/ShoeDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="/shoes/:id" element={<ShoeDetails />} />
            <Route path="categories" element={<Categories />} />
          </Routes>
          <Footer />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
