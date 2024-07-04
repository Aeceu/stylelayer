import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Minus, PackageCheck, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import axios from "@/store/api/axios";
import { TProductWithRatings } from "@/store/types/product";
import { handleAddToCart } from "@/store/actions/cartActions";

const Product = () => {
  const itemId = useSearchParams()[0].get("id");
  const [item, setItem] = useState<TProductWithRatings | null>(null);
  const [isloading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariants, setSelectedVariants] = useState<{ name: string; option: string }[]>([]);

  const { user } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const HandleAddToCart = (itemId: string) => {
    if (user) {
      dispatch(
        handleAddToCart({
          productId: itemId,
          quantity,
          userId: user.id,
          variants: selectedVariants,
        })
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/product/${itemId}`);
        setItem(res.data);
        setSelectedImage(res.data.productImage[0].imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleSelectedVariants = (name: string, option: string) => {
    setSelectedVariants((prevVariants) => {
      const existingVariantIndex = prevVariants.findIndex((variant) => variant.name === name);
      if (existingVariantIndex !== -1) {
        const updatedVariants = [...prevVariants];
        updatedVariants[existingVariantIndex] = { name, option };
        return updatedVariants;
      } else {
        return [...prevVariants, { name, option }];
      }
    });
  };

  if (isloading) {
    return (
      <div className="min-h-[500px] flex flex-col gap-4 items-center p-8">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

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
      <ProductBreadCrumb category={item.category} name={item.name} />

      <div className="flex items-start gap-8 ">
        <div className="shrink-0 w-1/4 flex flex-col gap-4">
          <div className="h-[400px] w-full  rounded-md border flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full rounded-md object-cover object-top"
                  />
                ) : (
                  <Label>No image is chosen.</Label>
                )}
              </DialogTrigger>
              <DialogContent className="p-0">
                <img
                  loading="lazy"
                  src={selectedImage}
                  alt={selectedImage}
                  className="w-full h-[700px] object-cover object-top rounded-md"
                />
              </DialogContent>
            </Dialog>
          </div>

          <span className="flex flex-wrap items-center gap-2">
            {item.productImage.map((item, i) => (
              <img
                onClick={() => setSelectedImage(item.imageUrl)}
                key={i}
                src={item.imageUrl}
                alt="Preview"
                className={`w-[50px] h-[50px] object-cover object-top rounded-sm ${
                  selectedImage === item.imageUrl && "border-2 border-orange-500"
                }`}
              />
            ))}
          </span>
        </div>

        <div className="w-full leading-3 flex flex-col justify-between gap-4">
          <Label className="tracking-wide font-bold text-4xl">{item.name}</Label>
          <Separator />
          <div className="flex items-center gap-2">
            <Label className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 text-orange-500 ${
                    i + 1 <= item.ratings.length && "fill-orange-500"
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
            <Label className="text-3xl font-bold text-rose-500">₱{item.price}</Label>
          </div>

          {item.variants.map((cat, i) => (
            <div key={i} className="mt-2 flex flex-col gap-2">
              <Label className="tracking-widest font-extrabold ">{cat.name}</Label>
              <span className="flex flex-wrap gap-2">
                {cat.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`w-max px-4 py-2 border cursor-pointer hover:bg-white-shade 
                      ${
                        selectedVariants.find(
                          (variant) => variant.name === cat.name && variant.option === option
                        ) && "border border-orange-500"
                      }`}
                    onClick={() => handleSelectedVariants(cat.name, option)}>
                    {option}
                  </div>
                ))}
              </span>
            </div>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Label className="tracking-widest font-extrabold ">quantity</Label>
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
                onClick={() => setQuantity((prev) => (prev >= item.stock ? prev : prev + 1))}
                className="w-[30px] h-[30px] border   flex items-center justify-center text-foreground bg-background hover:bg-white-shade rounded-none "
                size={"icon"}>
                <Plus className="w-4 h-4" />
              </Button>
              <Label className="ml-2 text-foreground">{item.stock} pieces available</Label>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              disabled={loading}
              onClick={() => HandleAddToCart(item.id)}
              className="flex items-center gap-4 border-2 text-rose-600 border-rose-600 text-lg shadow-md hover:bg-white-shade hover:text-rose-600"
              variant={"outline"}
              size={"lg"}>
              {loading ? (
                <>
                  Adding....
                  <Loader2 className="animate-spin w-6 h-6" />
                </>
              ) : (
                <>
                  Add to Cart <ShoppingBag className="w-6 h-6" />
                </>
              )}
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
              __html: item.description,
            }}
            className="w-full text-lg tracking-wide leading-loose "
          />
        </div>
      </div>
    </div>
  );
};
export default Product;
