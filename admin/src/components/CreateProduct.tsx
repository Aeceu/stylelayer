import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { TNewProduct, newProductSchema } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";

const CreateProduct = () => {
  const form = useForm<TNewProduct>({
    resolver: zodResolver(newProductSchema),
  });

  const handleSubmit = async (data: TNewProduct) => {
    console.log(data);
  };

  const [variants, setVariants] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState<string>("");
  const [createVariant, setCreateVariant] = useState(false);

  const handleAddNewVariantToArray = () => {
    setVariants([...variants, newVariant]);
    setNewVariant("");
    setCreateVariant(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm"
          size={"sm"}>
          ADD NEW PRODUCT
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[700px] min-h-[500px]  bg-[#0b0b0b] text-white border border-background/30">
        <DialogHeader>
          <DialogTitle className="p-2 font-extrabold tracking-widest text-3xl">
            Add new product
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full h-full flex flex-col gap-4">
                <div className=" flex items-start w-full h-full gap-4 p-2">
                  <div className="shrink-0 rounded-md border w-[200px] h-full border-dashed"></div>
                  <div className=" w-full h-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full flex items-start gap-4">
                          <FormLabel className="w-[50px] text-white p-2">Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-inherit outline-none text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full flex items-start gap-4">
                          <FormLabel className="w-[50px] text-white p-2">Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="bg-inherit outline-none text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stocks"
                      render={({ field }) => (
                        <FormItem className="w-full flex items-start gap-4">
                          <FormLabel className="w-[50px] text-white p-2">Stocks</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="bg-inherit outline-none text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Label className="p-2 text-white mb-2">Variants:</Label>
                    <span className="flex flex-wrap items-center gap-2 px-2">
                      {variants.map((item, i) => (
                        <span
                          key={i}
                          className="border rounded-md min-w-10 px-2 h-10 flex items-center justify-center ">
                          <Label className="text-sm font-bold text-white">{item}</Label>
                        </span>
                      ))}

                      {createVariant && (
                        <div className="border rounded-md w-max h-10 flex items-center justify-center ">
                          <Input
                            className="w-max text-sm font-bold text-white bg-inherit"
                            value={newVariant}
                            onChange={(e) => setNewVariant(e.target.value)}
                          />
                        </div>
                      )}
                      {createVariant ? (
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="col-span-2 flex items-center gap-2 justify-end">
                            <Button onClick={handleAddNewVariantToArray} size={"sm"}>
                              <p className="flex items-center gap-2 z-10 text-white  dark:text-black group-hover:dark:text-white group-hover:text-black group">
                                Add
                              </p>
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setCreateVariant(false)}
                              size={"sm"}>
                              <p className="flex items-center gap-2 z-10 text-white  dark:text-black group-hover:dark:text-white group-hover:text-black group">
                                Cancel
                              </p>
                            </Button>
                          </span>
                        </div>
                      ) : (
                        <span
                          onClick={() => setCreateVariant(true)}
                          className="border rounded-md w-10 h-10 flex items-center justify-center ">
                          <Plus className="w-10   text-muted-foreground" />
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-inherit outline-none text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <span className="mt-4 gap-4 flex items-center justify-end">
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-[80px] bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
                    size="sm">
                    {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Create"}
                  </Button>
                  <Button
                    type="button"
                    className="w-[80px] bg-red-600 hover:bg-red-500 text-white text-sm"
                    size="sm">
                    Clear
                  </Button>
                </span>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CreateProduct;
