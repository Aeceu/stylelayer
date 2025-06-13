import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchProducts,
  fetchProductsByCategory
} from "@/store/actions/productActions";
import { Checkbox } from "@/components/ui/checkbox";

const Products = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";
  const category = searchParams.get("category");

  const { products, status, totalPage } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory({ category, page, pageSize }));
    } else {
      dispatch(fetchProducts({ page, pageSize }));
    }
  }, []);

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="h-[600px] flex flex-col gap-4 items-center p-8">
        <img src="./svgs/no_product.svg" alt="no_product" width={200} />
        <Label className="text-4xl font-extrabold">
          No products available.
        </Label>
        <Button asChild>
          <Link to={"/"} className="bg-orange-600 hover:bg-orange-700">
            Back to home page
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="w-[300px] h-full p-8">
        <h1>Filter by</h1>
      </div>
      <div className="w-max h-full flex flex-col justify-center items-center  p-8">
        <div className="w-full h-full grid-cols-1 grid md:grid-cols-2 lg:grid-cols-5 gap-4 ">
          {products.map((item, i) => (
            <ProductCard item={item} key={i} />
          ))}
        </div>
        <Pagination className="mt-4">
          <PaginationContent>
            {Array.from({ length: totalPage }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={String(index + 1) === page ? true : false}
                  className={`${String(index + 1) === page && "border-2 border-orange-500"}`}
                  href={`/products?page=${index + 1}&pageSize=${pageSize}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default Products;
