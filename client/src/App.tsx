import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Product from "./pages/Product";
import Products from "./pages/Products";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product?" element={<Product />} />
        <Route path="products?" element={<Products />} />
      </Route>
    </Routes>
  );
};
export default App;
