import { HomePage } from "./components/HomePage/HomePage";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shoes from "./components/Shoes/Shoes";
import Categories from "./components/Categories/Categories";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ShoeDetails } from "./components/Shoes/ShoeDetails";
import { CreateForm } from "./components/Shoes/CreateForm/CreateForm";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shoes" element={<Shoes />} />
          <Route path="shoes/:id" element={<ShoeDetails />} />
          <Route path="categories" element={<Categories />} />
          <Route path="shoes/create" element={<CreateForm />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
