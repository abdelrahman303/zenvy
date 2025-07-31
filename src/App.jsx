import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/layout";
import Home from "./Components/Home/Home";
import ContactUs from "./Components/ContactUs/ContactUs";
import CartPage from "./Components/Cart/Cart";
import UserProfile from "./Components/UserProfile/UserProfile";
import Login from "./Components/Login/Login";
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
import DashboardDetails from "./Components/Dashboard/Dashboard/Dashboard";
import SalesByDateRange from "./Components/Dashboard/OrdersManagement/SalesByDateRange/SalesByDateRange";
import Collections from "./Components/Collection/Collection";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CreateOrder from "./Components/Order/CreateOrder/CreateOrder";
import GetAllUserOrders from "./Components/Order/GetAllUserOrders/GetAllUserOrders";
import UpdateOrderStatus from "./Components/Dashboard/OrdersManagement/UpdateOrderStatus/UpdateOrderStatus";

const routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <CartPage /> },
      { path: "subCategory/:categoryId", element: <SubCategory /> },
      { path: "productDetails/:productId", element: <ProductDetails /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "updateOrderStatus", element: <UpdateOrderStatus /> },
      { path: "profile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      {
        path: "dashboard",
        element: <ProtectedRoute requiredRole="admin"><Dashboard /></ProtectedRoute>,
        children: [
          { index: true, element: <ProtectedRoute requiredRole="admin"><DashboardDetails /></ProtectedRoute> },
          { path: "dashboardDetails", element: <ProtectedRoute requiredRole="admin"><DashboardDetails /></ProtectedRoute> },
          { path: "categoryManagement", element: <ProtectedRoute requiredRole="admin"><CategoryManagement /></ProtectedRoute> },
          { path: "productManagement", element: <ProtectedRoute requiredRole="admin"> <ProductManagement /></ProtectedRoute> },
          { path: "ordersManagement", element: <ProtectedRoute requiredRole="admin"> <OrdersManagement /> </ProtectedRoute> },
          { path: "lowStockProducts", element: <ProtectedRoute requiredRole="admin"> <LowStockProducts /> </ProtectedRoute> },
          { path: "salesByDateRange", element: <ProtectedRoute requiredRole="admin"> <SalesByDateRange /> </ProtectedRoute> },
        ]
      },
      { path: "collections", element: <Collections /> },
      { path: "my-orders", element: <GetAllUserOrders /> },
      { path: "create-order", element: <CreateOrder /> },
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