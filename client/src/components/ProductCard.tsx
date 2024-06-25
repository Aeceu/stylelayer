import { Star } from "lucide-react";
import { TProduct } from "../store/types/cart";
import { Link } from "react-router-dom";
import AddToCartDrawer from "./AddtoCartDrawer";

type Props = {
  item: TProduct;
  badge?: string;
};

const ProductCard: React.FC<Props> = ({ item, badge }) => {
  return (
    <div className="w-[400px] h-full flex flex-col leading-snug">
      <Link
        to={`/product?id=${item.productName.split(" ").join("_")}`}
        className="bg-[#e2e2e1] w-[400px] h-[400px] overflow-hidden rounded-md relative cursor-pointer">
        {badge && (
          <div className="text-xs font-bold px-2 py-1 bg-white absolute rounded-full shadow-md top-3 left-3">
            {badge}
          </div>
        )}
        <img
          loading="lazy"
          src={item.productImage}
          alt={item.productAlt}
          width={400}
          height={700}
        />
      </Link>
      <span className="flex items-center justify-between  mt-4">
        <h1 className="tracking-wide font-bold text-2xl">{item.productName}</h1>
        <p className="font-bold text-xl">
          ₱{item.productPrice.split(".")[0]}.
          <span className="text-xs">{item.productPrice.split(".")[1]}</span>
        </p>
      </span>
      <p className="my-1 w-max rounded-full px-2 py-1 text-xs bg-black-shade text-white">
        {item.productCategory}
      </p>
      <span className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 text-orange-500 ${i + 1 <= item.ratings && "fill-orange-500"}`}
          />
        ))}
      </span>
      <AddToCartDrawer item={item} />
    </div>
  );
};
export default ProductCard;
