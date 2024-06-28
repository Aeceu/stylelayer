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
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tiptap from "@/components/Tiptap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleFile } from "@/lib/handleFile";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const form = useForm<TNewProduct>({
    resolver: zodResolver(newProductSchema),
  });

  const handleSubmit = async (data: TNewProduct) => {
    console.log(data);
  };

  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [variants, setVariants] = useState<{ name: string; options: string[] }[]>([]);
  const [newVariant, setNewVariant] = useState<string>("");
  const [newVariantItem, setNewVariantItem] = useState("");
  const [createVariant, setCreateVariant] = useState(false);

  const handleAddNewVariantToArray = () => {
    const foundVariant = variants.map((item) =>
      item.name === newVariant ? { ...item, options: [...item.options, newVariantItem] } : item
    );
    setVariants(foundVariant);
    setNewVariantItem("");
  };

  const handleCreateNewVariant = (name: string) => {
    setNewVariant(name);
    const foundVariant = variants.map((item) => (item.name === name ? true : false));
    if (foundVariant.find((item) => item === true)) {
      return;
    } else {
      setVariants([...variants, { name, options: [] }]);
    }
  };

  const handleDeleteOption = (variantName: string, optionName: string) => {
    const newVariants = variants.map((item) =>
      item.name === variantName
        ? { ...item, options: [...item.options.filter((option) => option !== optionName)] }
        : item
    );
    setVariants(newVariants);
  };

  const handleGetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length < 8) {
      handleFile(e)
        .then((res) => {
          if (res) {
            setImages([...images, res]);
          }
        })
        .catch((error) => {
          console.error("Error reading file:", error);
        });
    } else {
      toast.error("Max image is reach!");
    }
  };

  return (
    <ScrollArea className="w-full h-screen bg-[#0b0b0b] text-white flex flex-col p-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full h-full flex flex-col gap-4 p-4">
          <div className=" flex items-start w-full   gap-4 p-2 ">
            <div className="shrink-0 w-1/4 flex flex-col gap-4">
              <div className="h-[400px] border-dashed rounded-md border flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full rounded-md object-cover"
                  />
                ) : (
                  <Label>No image is chosen.</Label>
                )}
              </div>
              <span className="flex items-center gap-2">
                {images.length > 0 &&
                  images.map((item, i) => (
                    <img
                      onClick={() => setSelectedImage(item)}
                      key={i}
                      src={item}
                      alt="Preview"
                      className="w-[50px] h-[50px] object-cover rounded-sm"
                    />
                  ))}

                <Label
                  htmlFor="file-upload"
                  className="w-[50px] h-[50px] rounded-sm border flex items-center justify-center">
                  <Plus />
                </Label>

                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleGetImage}
                  accept=".jpg, .png, .jpeg"
                />
              </span>
            </div>
            <div className=" w-full h-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-4 h-[60px]">
                    <FormLabel className="w-1/12 text-white p-2">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full bg-[#222222] border-background/10 rounded-xl outline-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-4 h-[60px]">
                    <FormLabel className="w-1/12 text-white p-2">Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full bg-[#222222] border-background/10 rounded-xl outline-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-4 h-[60px]">
                    <FormLabel className="w-1/12 text-white p-2">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="h-full bg-[#222222] border-background/10 rounded-xl outline-none text-white"
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
                  <FormItem className="w-full flex items-center gap-4 h-[60px]">
                    <FormLabel className="w-1/12 text-white p-2">Stocks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="h-full bg-[#222222] border-background/10 rounded-xl outline-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="p-2 mt-2 flex flex-col gap-4">
                <Label className=" text-white ">Variants:</Label>

                {variants.map((item, i) => (
                  <div key={i} className="px-8 flex items-center gap-2">
                    <Label>{item.name}:</Label>
                    {item.options.map((option, i) => (
                      <span
                        onClick={() => handleDeleteOption(item.name, option)}
                        key={i}
                        className="border rounded-md min-w-8 px-2 h-8 flex items-center justify-center ">
                        <Label className="text-xs text-white">{option}</Label>
                      </span>
                    ))}
                  </div>
                ))}

                {createVariant ? (
                  <span className="flex items-center gap-2">
                    <Select
                      value={newVariant}
                      onValueChange={(value) => handleCreateNewVariant(value)}>
                      <SelectTrigger className="w-[180px] bg-inherit text-white">
                        <SelectValue placeholder="Choose variant" />
                      </SelectTrigger>
                      <SelectContent className="bg-inherit text-white">
                        <SelectItem value="size">size</SelectItem>
                        <SelectItem value="color">color</SelectItem>
                      </SelectContent>
                    </Select>

                    {newVariant && (
                      <>
                        <div className="border rounded-md w-max h-10 flex items-center justify-center ">
                          <Input
                            className="w-max text-sm font-bold text-white bg-inherit"
                            value={newVariantItem}
                            onChange={(e) => setNewVariantItem(e.target.value)}
                          />
                        </div>
                        <span className="col-span-2 flex items-center gap-2 justify-end">
                          <Button
                            type="button"
                            onClick={handleAddNewVariantToArray}
                            size={"sm"}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white ">
                            Add
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setCreateVariant(false)}
                            className="bg-red-600 hover:bg-red-500 text-white "
                            size={"sm"}>
                            Cancel
                          </Button>
                        </span>
                      </>
                    )}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => setCreateVariant(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white "
                      size={"sm"}>
                      Add new variant
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-full gap-2 flex flex-col">
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Tiptap value={field.value} onChange={field.onChange} />
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
    </ScrollArea>
  );
};
export default CreateProduct;
