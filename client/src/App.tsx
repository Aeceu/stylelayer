import { Route, Routes } from "react-router-dom";
import PersistentLogin from "./components/PersistentLogin";

import Layout from "./Layout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Products from "./pages/Products";

import ProfileLayout from "./ProfileLayout";
import Profile from "./pages/Profile";
import Address from "./pages/Address";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Order from "./pages/Order";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistentLogin />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product?" element={<Product />} />
          <Route path="products?" element={<Products />} />
          <Route path="order?" element={<Order />} />
          <Route path="orders" element={<Orders />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default App;
