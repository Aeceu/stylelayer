import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  fetchProducts,
  fetchProductsByCategory,
  getCategories,
  pageSize,
  sortProductsByPrice
} from "@/store/actions/productActions";
import { AppDispatch, RootState } from "@/store/store";
import { ListFilter, Loader2, PhilippinePeso, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const category = searchParams.get("category");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory({ category, page }));
    } else {
      dispatch(fetchProducts({ page }));
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center ">
      <FilterBar />
      <ProductsFeed />
    </div>
  );
};
export default Products;

const FilterBar = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const [categories, setCategories] = useState<{ category: string }[]>([]);
  const [sort, setSort] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [rate, setRate] = useState<string | null>(null);

  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  const handleFilterProducts = () => {
    sortProductsByPrice(sort, category, rate, products, dispatch);
  };

  const handleClearFilter = () => {
    setSort(null);
    setCategory(null);
    setRate(null);
    dispatch(fetchProducts({ page }));
  };

  useEffect(() => {
    getCategories().then((res) => {
      if (Array.isArray(res)) {
        setCategories(res);
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <div className="w-[250px] h-full p-4 flex flex-col gap-2">
      {/* Price */}
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-1 mt-2">
          <PhilippinePeso size="20" />
          <h1 className="text-lg">Price</h1>
        </span>
        <RadioGroup value={sort} onValueChange={(value) => setSort(value)}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low" className="text-xs">
              Price (lowest to highest)
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high" className="text-xs">
              Price (highest to lowest)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-1 mt-2">
          <ListFilter size="20" />
          <h1 className="text-lg">Category</h1>
        </span>
        <RadioGroup
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          {categories.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <RadioGroupItem value={item.category} id={item.category} />
              <Label htmlFor={item.category} className="text-xs">
                {item.category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Ratings */}
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-1 mt-2">
          <Star size="20" />
          <h1 className="text-lg">Ratings</h1>
        </span>

        <RadioGroup value={rate} onValueChange={(value) => setRate(value)}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <RadioGroupItem
                value={`${index + 1}-rate`}
                id={`${index + 1}-rate`}
              />
              <Label
                htmlFor={`${index + 1}-rate`}
                className="flex items-center"
              >
                {Array.from({ length: index + 1 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 text-orange-500 ${
                      i + 1 <= 5 && "fill-orange-500"
                    }`}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="border-t w-full my-2" />

      <Button
        onClick={handleFilterProducts}
        className="rounded-none bg-orange-500 shadow-md"
      >
        Apply Filter
      </Button>
      <Button
        onClick={handleClearFilter}
        className="rounded-none bg-white text-orange-500 border border-orange-500 shadow-md"
      >
        Clear Filter
      </Button>
    </div>
  );
};

const ProductsFeed = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { products, totalPage, status } = useSelector(
    (state: RootState) => state.product
  );

  if (status === "pending") {
    return (
      <div className="w-[60%] h-full flex flex-col justify-center items-center p-8">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-[60%] h-full flex flex-col justify-center items-center p-8">
        <img src="./svgs/no_product.svg" alt="no_product" width={200} />
        <Label className="text-4xl font-extrabold">
          No products available.
        </Label>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 mt-4">
          <Link to={"/"} className="">
            Back to home page
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[60%] h-full flex flex-col justify-center items-center border-l p-4">
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
                className={`${
                  String(index + 1) === page && "border-2 border-orange-500"
                }`}
                href={`/products?page=${index + 1}&pageSize=${pageSize}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
