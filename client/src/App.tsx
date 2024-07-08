import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Product from "./pages/Product";
import Products from "./pages/Products";
import PersistentLogin from "./components/PersistentLogin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProfileLayout from "./ProfileLayout";
import Settings from "./pages/Settings";
import Address from "./pages/Address";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistentLogin />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product?" element={<Product />} />
          <Route path="products?" element={<Products />} />

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
