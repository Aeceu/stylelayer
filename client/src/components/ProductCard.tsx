import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { TProduct } from "@/store/types/product";
import { Label } from "./ui/label";
// import AddToCartDrawer from "./AddtoCartDrawer";

type Props = {
  item: TProduct;
};

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-[400px] h-full flex flex-col leading-snug border rounded-md ">
      <Link
        to={`/product?id=${item.id}`}
        className="bg-[#e2e2e1] w-full h-[400px]  overflow-hidden  relative cursor-pointer">
        <img
          loading="lazy"
          src={item.productImage[0].imageUrl}
          alt={item.productImage[0].imageId}
          className="w-full h-full object-cover object-top"
        />
      </Link>

      <div className="flex flex-col p-2 gap-2">
        <h1 className="line-clamp-2 tracking-wide font-bold text-2xl">{item.name}</h1>
        <Label className="text-rose-500  text-2xl tracking-widest ">₱{item.price}</Label>
        <span className="flex items-center gap-1 ">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 text-orange-500 ${i + 1 <= 5 && "fill-orange-500"}`}
            />
          ))}
        </span>
        {/* <p className="my-1 w-max rounded-full px-2 py-1 text-xs bg-black-shade text-white">
          {item.category}
        </p> */}
      </div>
    </div>
  );
};
export default ProductCard;
