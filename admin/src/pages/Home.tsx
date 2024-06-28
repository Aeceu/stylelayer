import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Home = () => {
  return (
    <div className="w-full h-full bg-[#0b0b0b] text-white flex flex-col p-4">
      <nav className="w-full h-[60px] flex items-center justify-between">
        <div className="p-2 h-full relative flex items-center gap-2 rounded-2xl bg-[#222222] w-[500px]">
          <Input className="bg-inherit w-full h-full border-none ring-0  outline-none rounded-l-2xl" />
          <Search className="mr-2 w-8 h-8" />
        </div>
      </nav>

      <main></main>
    </div>
  );
};
export default Home;
