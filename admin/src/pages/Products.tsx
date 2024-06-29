import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/product";
import axios from "@/api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";
  const [products, setProducts] = useState<TProduct[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/products?page=${page}&pageSize=${pageSize}`);
        setProducts(res.data.products);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white flex flex-col ">
      <div className="h-[100px] flex items-center justify-between px-4">
        <Label className="title  text-5xl tracking-widest">StyleLayerCo.</Label>
      </div>
      <Table className="border-y border-background">
        <TableHeader>
          <TableRow className="hover:bg-[#222222] cursor-pointer divide-x-2">
            <TableHead className="shrink-0 whitespace-nowrap w-[100px]">Image</TableHead>
            <TableHead className="shrink-0 whitespace-nowrap w-[200px]">Name</TableHead>
            <TableHead className="shrink-0 whitespace-nowrap w-[200px]">Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead>Variants</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item, i) => (
            <TableRow
              onClick={() => nav(`/product?id=${item.id}`)}
              key={i}
              className="hover:bg-[#222222] cursor-pointer divide-x-2">
              <TableCell className="p-1 w-[100px] h-[70px]">
                <img
                  src={item.productImage[0].imageUrl}
                  alt={item.productImage[0].imageUrl}
                  className="object-cover object-top w-full h-full"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.variants.map((item) => item.name + " ")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#0b0b0b] border-background/50 text-white">
                    <DropdownMenuItem className="text-emerald-500 hover:bg-emerald-500 hover:text-white">
                      Update stock
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-emerald-500 hover:bg-emerald-500 hover:text-white">
                      Edit product
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 hover:bg-red-500 hover:text-white">
                      Delete product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Products;
