import { Search } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full h-[500px] bg-black text-white flex items-center justify-between gap-8 p-8">
      <span className="w-1/4 shrink-0 space-y-4">
        <h1 className="text-5xl font-extrabold  leading-tight tracking-wider">
          Trends Change,
          <br /> Class Remains.
        </h1>
        <p className="text-background/90 tracking-widest">High quality clothing lines.</p>
      </span>
      <div className="w-3/4 grid grid-cols-4">
        <span className="flex flex-col gap-2">
          <h1 className="font-extrabold text-xl mb-8">Products</h1>
          <p className="text-background/50">Jackets</p>
          <p className="text-background/50">Headwear</p>
          <p className="text-background/50">Tshirts</p>
          <p className="text-background/50">Sweaters</p>
        </span>
        <span className="flex flex-col gap-2">
          <h1 className="font-extrabold text-xl mb-8">Buying</h1>
          <p className="text-background/50">Shop</p>
          <p className="text-background/50">Term of Use</p>
          <p className="text-background/50">Privacy</p>
          <p className="text-background/50">How it works</p>
          <p className="text-background/50">Customer Service</p>
        </span>
        <span className="flex flex-col gap-2">
          <h1 className="font-extrabold text-xl mb-8">Social</h1>
          <p className="text-background/50">Facebook</p>
          <p className="text-background/50">Twitter (X)</p>
          <p className="text-background/50">Instagram</p>
        </span>
        <span className="flex flex-col gap-2">
          <h1 className="font-extrabold text-xl mb-8">Join our Community</h1>
          <span className="rounded-full  px-2 py-2 border border-white flex items-center justify-between">
            <input
              type="email"
              placeholder="type your email here"
              className="bg-inherit outline-none  w-full"
            />
            <div className="bg-white rounded-full h-[30px] w-[30px] flex items-center justify-center">
              <Search className="text-black w-4 h-4" />
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};
export default Footer;
