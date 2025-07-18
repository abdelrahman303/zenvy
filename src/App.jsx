import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/layout";
// import { NotFound } from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs/ContactUs";



const routing = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "contactus", element: <ContactUs /> },


      // { path: '*', element: <NotFound /> }
    ],
  },
]);


function App() {

  return (
    <RouterProvider router={routing} />
  );
}
export default App;