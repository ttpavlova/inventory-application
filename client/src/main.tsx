import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./components/categories/Categories.tsx";
import Shoes from "./components/shoes/Shoes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
