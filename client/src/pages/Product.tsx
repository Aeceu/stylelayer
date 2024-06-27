import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TProduct } from "@/store/types/cart";
import { Minus, PackageCheck, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import variants from "@/data/variants.json";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import products from "@/data/products.json";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addtoCart } from "@/store/slices/cartSlices";

const Product = () => {
  const itemId = useSearchParams()[0].get("id");
  const [item, setItem] = useState<TProduct | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const HandleAddToCart = (itemId: string | null) => {
    dispatch(addtoCart({ item, quantity, color: selectedColor, size: selectedSize, id: itemId }));
  };

  useEffect(() => {
    const fetchProduct = () => {
      if (itemId) {
        const productFound = products.find(
          (product) => product.productName === itemId?.split("_").join(" ")
        );
        setItem(productFound);
      }
    };
    fetchProduct();
  }, []);

  if (!item || !itemId) {
    return (
      <div className="min-h-[500px] flex flex-col gap-4 items-center p-8">
        <img src="./svgs/no_product.svg" alt="no_product" width={200} />
        <Label className="text-4xl font-extrabold">Product not available.</Label>
        <Button asChild>
          <Link to={"/"} className="bg-orange-600 hover:bg-orange-700">
            Back to home page
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 p-8">
      <ProductBreadCrumb category={item.productCategory} name={item.productName} />

      <div className="flex items-start gap-8 ">
        <Dialog>
          <DialogTrigger asChild>
            <div className="bg-[#e2e2e1] w-1/4 h-[600px] overflow-hidden rounded-md relative cursor-pointer flex justify-center">
              <img
                loading="lazy"
                src={item.productImage}
                alt={item.productAlt}
                className="w-full h-[700px] object-cover object-top"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="p-0">
            <img
              loading="lazy"
              src={item.productImage}
              alt={item.productAlt}
              className="w-full h-[700px] object-cover object-top rounded-md"
            />
          </DialogContent>
        </Dialog>

        <div className="w-full leading-3 flex flex-col justify-between gap-4">
          <Label className="tracking-wide font-bold text-4xl">{item.productName}</Label>
          <Separator />
          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 text-orange-500 ${
                    i + 1 <= item.ratings && "fill-orange-500"
                  }`}
                />
              ))}
            </Label>
            <Separator orientation="vertical" className="mx-2 h-[30px] " />
            <Label>0 Ratings</Label>
            <Separator orientation="vertical" className="mx-2 h-[30px] " />
            <Label>10 Sold</Label>
          </div>

          <div className="w-max  bg-white-shade p-4 flex items-center">
            <Label className="text-3xl font-bold text-rose-500">
              ₱{item.productPrice.split(".")[0]} - ₱{Number(item.productPrice.split(".")[0]) + 20}
            </Label>
          </div>

          <div className="w-1/2 mt-4 flex flex-col gap-2">
            <Label className="tracking-wide">Colors</Label>
            <span className="flex flex-wrap gap-2">
              {variants.colors.map((color, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 border cursor-pointer hover:bg-white-shade ${
                    selectedColor === color.name && "border-rose-600 text-rose-600"
                  }`}
                  onClick={() => setSelectedColor(color.name)}>
                  {color.name}
                </div>
              ))}
            </span>
            <Label className="mt-2 tracking-wide">Sizes</Label>
            <span className="flex flex-wrap gap-2">
              {variants.size.map((size, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 cursor-pointer hover:bg-white-shade border ${
                    selectedSize === size.name && "border-rose-600 text-rose-600"
                  }`}
                  onClick={() => setSelectedSize(size.name)}>
                  {size.name}
                </div>
              ))}
            </span>
            <Label className="mt-2 tracking-wide">Quantity</Label>
            <div className="flex items-center w-max">
              <Button
                onClick={() => setQuantity((prev) => (prev <= 0 ? (prev = 0) : prev - 1))}
                className="w-[30px] h-[30px] border   flex items-center justify-center text-foreground bg-background hover:bg-white-shade rounded-none "
                size={"icon"}>
                <Minus className="w-4 h-4" />
              </Button>
              <Label className="w-[30px] h-[30px] border-y  flex items-center justify-center">
                {quantity}
              </Label>
              <Button
                onClick={() =>
                  setQuantity((prev) => (prev >= item.productQuantity ? prev : prev + 1))
                }
                className="w-[30px] h-[30px] border   flex items-center justify-center text-foreground bg-background hover:bg-white-shade rounded-none "
                size={"icon"}>
                <Plus className="w-4 h-4" />
              </Button>
              <Label className="ml-2 text-foreground">
                {item.productQuantity} pieces available
              </Label>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              onClick={() => HandleAddToCart(itemId)}
              className="flex items-center gap-4 border-2 text-rose-600 border-rose-600 text-lg shadow-md hover:bg-white-shade hover:text-rose-600"
              variant={"outline"}
              size={"lg"}>
              Add to Cart <ShoppingBag className="w-6 h-6" />
            </Button>
            <Button
              className="flex items-center gap-4 text-white border-2 border-rose-600 bg-rose-600 text-lg shadow-md hover:bg-rose-500 hover:text-white"
              variant={"outline"}
              size={"lg"}>
              Order now <PackageCheck className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full bg-white-shade p-4 rounded-md">
        <Label className="font-bold text-3xl">Product Description</Label>
        <Separator className="my-2 bg-foreground/10" />
        <div className="">
          <Label
            dangerouslySetInnerHTML={{
              __html: item.productDescription,
            }}
            className="w-full text-lg tracking-wide leading-loose "
          />
        </div>
      </div>
    </div>
  );
};
export default Product;
