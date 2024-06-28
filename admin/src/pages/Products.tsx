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
import CreateProduct from "@/components/CreateProduct";

const Products = () => {
  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white flex flex-col ">
      <div className="h-[100px] flex items-center justify-between px-4">
        <Label className="title  text-5xl tracking-widest">StyleLayerCo.</Label>
        <CreateProduct />
      </div>
      <Table className="border-y border-background">
        <TableHeader>
          <TableRow className="hover:bg-[#222222] cursor-pointer divide-x-2">
            <TableHead className="shrink-0 whitespace-nowrap w-[200px]">Name</TableHead>
            <TableHead className="shrink-0 whitespace-nowrap w-[200px]">Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-[#222222] cursor-pointer divide-x-2">
            <TableCell>Black tshirt</TableCell>
            <TableCell>shirt</TableCell>
            <TableCell>
              <div className="line-clamp-1">High quality cotton made black - tshirt</div>
            </TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>50</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
};
export default Products;
