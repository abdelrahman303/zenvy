import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/layout";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs/ContactUs";
import CartPage from "./Components/Cart/Cart";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Login/Login";
import Collections from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import ConfirmEmail from "./Components/Login/ConfirmEmail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";



const routing = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <CartPage /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "profile", element: <ProtectedRoute> <UserProfile /></ProtectedRoute> },
      { path: "collections", element: <Collections /> },
      { path: "confirmEmail", element: <ConfirmEmail /> },
      { path: "login", element: <Login /> },


      { path: '*', element: <NotFound /> }
    ],
  },
]);


function App() {

  return (
    <RouterProvider router={routing} />
  );
}
export default App;