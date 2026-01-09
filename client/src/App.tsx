import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Shoes } from "./pages/Shoes/Shoes";
import { ShoeDetails } from "./pages/ShoeDetails/ShoeDetails";
import { CreateForm } from "./pages/CreateForm/CreateForm";
import { UpdateForm } from "./pages/UpdateForm/UpdateForm";
import { NotFound } from "./pages/NotFound/NotFound";
import { Error } from "./pages/Error/Error";
import { Layout } from "./pages/Layout/Layout";
import { LayoutWrapper } from "./pages/LayoutWrapper/LayoutWrapper";
import "./App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <LayoutWrapper children={<Error />} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shoes",
        element: <Shoes />,
      },
      {
        path: "shoes/:id",
        element: <ShoeDetails />,
      },
      {
        path: "shoes/create",
        element: <CreateForm />,
      },
      {
        path: "shoes/update/:id",
        element: <UpdateForm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
