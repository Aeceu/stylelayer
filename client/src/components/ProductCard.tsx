import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { TProduct } from "@/store/types/product";
import { Label } from "./ui/label";

type Props = {
  item: TProduct;
};

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-[200px] h-[300px] shadow-md flex flex-col leading-snug border hover:border-orange-500">
      <Link
        to={`/product?id=${item.id}`}
        className="bg-[#e2e2e1] w-full h-[300px] overflow-hidden  relative cursor-pointer"
      >
        <img
          loading="lazy"
          src={item.productImage[0].imageUrl}
          alt={item.productImage[0].imageId}
          className="w-full h-full object-cover object-top"
        />
      </Link>

      <div className="flex flex-col p-2">
        <h1 className="line-clamp-1 tracking-wide font-semibold">
          {item.name}
        </h1>
        <span className="flex items-center gap-1 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 text-orange-500 ${i + 1 <= 5 && "fill-orange-500"}`}
            />
          ))}
        </span>
        <Label className="text-rose-500  text-lg font-bold mt-4">
          <span className="text-xl font-bold">₱ </span>
          {item.price}.00
        </Label>

        {/* <AddToCartDrawer item={item} /> */}
      </div>
    </div>
  );
};
export default ProductCard;
