import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Minus, PackageCheck, Plus, ShoppingBag, Star } from "lucide-react";
import variants from "@/data/variants.json";
import { TProductWithRatings } from "@/store/types/product";

type AddToCartDrawerProps = {
  item: TProductWithRatings;
};

const AddToCartDrawer: React.FC<AddToCartDrawerProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mt-2 px-6 py-2 border rounded-full border-rose-500 bg-transparent text-rose-500 w-max hover:bg-rose-600 hover:text-white">
          Add to Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-start gap-4">
          <div className="bg-[#e2e2e1] w-1/4 h-[600px] overflow-hidden rounded-md relative cursor-pointer flex justify-center">
            <img
              src={item.productImage[0].imageUrl}
              alt={item.productImage[0].imageId}
              className="w-full h-[700px] object-cover object-top"
            />
          </div>
          <div className=" leading-3 flex flex-col justify-between gap-4">
            <DrawerTitle className="tracking-wide font-bold text-4xl">{item.name}</DrawerTitle>
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

            <div className="w-full  bg-white-shade p-4 flex items-center">
              <Label className="text-3xl font-bold text-rose-500">
                ₱{item.price} - ₱{Number(item.price) + 20}
              </Label>
            </div>

            <div className="mt-4 flex flex-col gap-2">
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
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default AddToCartDrawer;
