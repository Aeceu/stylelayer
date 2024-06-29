import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import Product from "./pages/Product";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products?" element={<Products />} />
        <Route path="product?" element={<Product />} />
        <Route path="create_product" element={<CreateProduct />} />
      </Route>
    </Routes>
  );
};
export default App;
