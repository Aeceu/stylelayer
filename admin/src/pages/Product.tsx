import axios from "@/api/axios";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TProduct } from "@/types/product";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Product = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<TProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/product/${productId}`);
        setProduct(res.data);
        setSelectedImage(res.data.productImage[0].imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0b0b0b] text-white flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <Label className="w-full h-full bg-[#0b0b0b] text-white flex flex-col p-4">
        Product not found.
      </Label>
    );
  }

  return (
    <ScrollArea className="w-full h-full bg-[#0b0b0b] text-white flex flex-col p-4">
      <Label className="font-bold text-3xl tracking-widest">Product</Label>
      <Separator className="my-4" />
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <div className=" flex items-start w-full   gap-4 p-2 ">
          <div className="shrink-0 w-1/4 flex flex-col gap-4">
            <div className="h-[400px] w-full  rounded-md border border-background/30 bg-[#222222] flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full rounded-md object-cover object-top"
                />
              ) : (
                <Label>No image is chosen.</Label>
              )}
            </div>

            <span className="flex flex-wrap items-center gap-2">
              {product.productImage.map((item, i) => (
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
          <div className=" w-full h-full flex flex-col gap-2">
            <span className="w-full flex items-center gap-4 h-[60px]">
              <Label className="w-1/12 text-white p-2">Name</Label>
              <Label className="w-max bg-[#0b0b0b] border-none text-xl font-bold tracking-widest rounded-xl outline-none text-white">
                {product.name}
              </Label>
            </span>
            <span className="w-full flex items-center gap-4 h-[60px]">
              <Label className="w-1/12 text-white p-2">Category</Label>
              <Label className="w-max bg-[#0b0b0b] border-none text-xl font-extrabold tracking-widest rounded-xl outline-none text-white">
                {product.category}
              </Label>
            </span>
            <span className="w-full flex items-center gap-4 h-[60px]">
              <Label className="w-1/12 text-white p-2">Price</Label>
              <Label className="w-max bg-[#0b0b0b] border-none text-xl font-bold tracking-widest rounded-xl outline-none text-white">
                ₱ {product.price}
              </Label>
            </span>
            <span className="w-full flex items-center gap-4 h-[60px]">
              <Label className="w-1/12 text-white p-2">Stock</Label>
              <Label className="w-max bg-[#0b0b0b] border-none text-xl font-bold tracking-widest rounded-xl outline-none text-white">
                {product.stock}
              </Label>
              <Label className="text-xs tracking-wide">pieces available</Label>
            </span>

            <div className="p-2 mt-2 flex flex-col gap-2">
              <Label className=" text-white ">Variants:</Label>
              {product.variants.map((item, i) => (
                <div key={i} className="px-5 flex items-center gap-2">
                  <Label className="min-w-10 text-end">{item.name}:</Label>
                  {item.options.map((option, i) => (
                    <span
                      key={i}
                      className="border rounded-md min-w-8 px-2 h-8 flex items-center justify-center ">
                      <Label className="text-xs text-white">{option}</Label>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="w-full flex flex-col  gap-2 h-full">
          <Label className="  text-white p-2">Description</Label>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className=" h-full bg-[#222222] border-background/10 rounded-lg whitespace-pre-wrap outline-none text-white p-4 tracking-wide leading-[2]"
          />
        </span>
      </div>
    </ScrollArea>
  );
};
export default Product;
