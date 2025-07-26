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
import Dashboard from "./Components/Dashboard/Dashboard";
import CategoryManagement from "./Components/Dashboard/CategoryManagement/CategoryManagement";
import ProductManagement from "./Components/Dashboard/ProductManagement/ProductManagement";
import OrdersManagement from "./Components/Dashboard/OrdersManagement/OrdersManagement";
import LowStockProducts from "./Components/Dashboard/ProductManagement/LowStock/LowStock";
import SubCategory from "./Components/Category/SubCategory/SubCategory";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";

const routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <CartPage /> },
      { path: "subCategory/:categoryId", element: <SubCategory /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "profile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      {
        path: "dashboard",
        element: <ProtectedRoute requiredRole="admin"><Dashboard /></ProtectedRoute>,
        children: [
          { index: true, element: <ProtectedRoute requiredRole="admin"><CategoryManagement /></ProtectedRoute> },
          { path: "categoryManagement", element: <ProtectedRoute requiredRole="admin"><CategoryManagement /></ProtectedRoute> },
          { path: "productManagement", element: <ProtectedRoute requiredRole="admin"> <ProductManagement /></ProtectedRoute> },
          { path: "ordersManagement", element: <ProtectedRoute requiredRole="admin"> <OrdersManagement /> </ProtectedRoute> },
          { path: "lowStockProducts", element: <ProtectedRoute requiredRole="admin"> <LowStockProducts /> </ProtectedRoute> },
        ]
      },
      { path: "collections", element: <Collections /> },
      { path: "confirmEmail", element: <ConfirmEmail /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);



function App() {

  return (

    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={routing} />
      </CartContextProvider>
    </UserContextProvider>
  );
}
export default App;