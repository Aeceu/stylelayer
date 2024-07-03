import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Product from "./pages/Product";
import Products from "./pages/Products";
import PersistentLogin from "./components/PersistentLogin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistentLogin />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product?" element={<Product />} />
          <Route path="products?" element={<Products />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default App;
