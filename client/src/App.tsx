import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Home } from "./pages/Home/Home";
import { Shoes } from "./pages/Shoes/Shoes";
import { Categories } from "./pages/Categories/Categories";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ShoeDetails } from "./pages/ShoeDetails/ShoeDetails";
import { CreateForm } from "./pages/CreateForm/CreateForm";
import { UpdateForm } from "./pages/UpdateForm/UpdateForm";
import { NotFound } from "./pages/NotFound/NotFound";
import { Error } from "./pages/Error/Error";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <ErrorBoundary fallback={<Error />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="shoes/:id" element={<ShoeDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="shoes/create" element={<CreateForm />} />
            <Route path="shoes/update/:id" element={<UpdateForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
