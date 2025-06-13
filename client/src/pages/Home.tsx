import CarouselCards from "@/components/CarouselCards";
import Footer from "@/components/Footer";
import Popup from "@/components/animation/popup";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Battery, Ellipsis, LucideArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">
      <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_700px] gap-4 p-8">
        <div className="p-8 relative rounded-3xl bg-black-shade row-span-2 overflow-hidden flex flex-col justify-between gap-4">
          <img
            loading="lazy"
            src={"/pic-2.png"}
            alt="pic2"
            className="z-[1] lg:w-[1000px] lg:h-[1000px] w-[300px] h-[300px] object-cover  absolute lg:right-[-20%] right-[-10%]  lg:bottom-[-25%] bottom-[-100%]"
          />
          <span className="z-[2] ">
            <h1 className="leading-tight tracking-wide text-white w-max h-max text-6xl lg:text-8xl font-bold">
              Style Flows,
              <br /> Quality Grows.
            </h1>
            <p className="text-background/90 tracking-widest">
              High quality clothing lines.
            </p>
          </span>
          <span className="flex items-center gap-2">
            <Link
              className="bg-white shadow-md text-black-shade hover:bg-white/50 rounded-full font-bold lg:text-xl text-sm  px-4 py-4"
              to="/products?page=1&pageSize=12"
            >
              Explore Products
            </Link>
            <Button className="bg-white hover:bg-white/50  shadow-md text-black-shade rounded-full font-bold text-2xl lg:py-8 py-5">
              <LucideArrowRight className="lg:w-8 lg:h-8 w-4 h-4" />
            </Button>
          </span>
        </div>

        <CarouselCards />

        <div
          className="h-[370px] flex items-end rounded-3xl p-8 overflow-hidden  bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url(/cap.jpg)" }}
        >
          <h1 className="text-6xl tracking-wide font-bold text-white">
            # FASHION
          </h1>
        </div>
      </div>

      <div className="relative overflow-hidden w-full flex items-center justify-center h-[700px]">
        <h1 className="font-bold text-5xl w-3/4 tracking-widest leading-tight text-center">
          Timeless Fashion for the Modern Man. Trends come and go with the
          seasons, but our clothing captures the essence of{" "}
          <i className="text-rose-400">enduring style</i> and{" "}
          <i className="text-orange-400">sophistication</i>.
        </h1>
        <Popup delay={0.5} className="absolute top-[25%] left-[12.5%]">
          <img
            loading="lazy"
            src="/pic-4.jpg"
            alt="pic-4"
            width={100}
            height={100}
            className="rounded-full h-[100px] overflow-hidden w-[100px] object-center object-cover shadow-md"
          />
        </Popup>

        <Popup delay={0.55} className="absolute top-[70%] left-[20%]">
          <img
            loading="lazy"
            src="/pic-5.jpg"
            alt="pic-5"
            width={100}
            height={100}
            className="rounded-full h-[100px] overflow-hidden w-[100px] object-center object-cover shadow-md"
          />
        </Popup>

        <Popup delay={0.6} className="absolute top-[10%] right-[25%]">
          <img
            loading="lazy"
            src="/pic-6.jpg"
            alt="pic-6"
            width={100}
            height={100}
            className="rounded-full h-[100px] overflow-hidden w-[100px] object-center object-cover shadow-md"
          />
        </Popup>

        <Popup delay={0.65} className="absolute top-[50%] right-[10%]">
          <img
            loading="lazy"
            src="/pic-7.jpg"
            alt="pic-7"
            width={100}
            height={100}
            className="rounded-full h-[100px] overflow-hidden w-[100px] object-center object-cover shadow-md"
          />
        </Popup>
      </div>

      <div className="w-full h-screen bg-white-shade  flex items-center justify-between  gap-4 p-16">
        <div className="relative flex flex-col justify-center gap-6 p-4 w-full h-full">
          <h1 className="leading-tight tracking-wide  w-max h-max text-6xl lg:text-8xl font-bold">
            Superior Style,
            <br /> Crafted with Class.
          </h1>
          <p className="w-1/2 mt-4 text-lg tracking-wide">
            Discover our range of premium clothing that combines style and
            sophistication for the modern fashion enthusiast.
          </p>
          <Link
            className="bg-black text-white rounded-md px-4 py-2 w-max"
            to="/products?page=1&pageSize=12"
          >
            Browser Now
          </Link>

          <Card
            img="/products/prod-1.jpg"
            name="Kinnstorm Jacket"
            category={["jacket"]}
            variant={["Red"]}
            delay={0.3}
            duration={0.3}
            className=" absolute right-10 top-0"
          />

          <Card
            img="/products/prod-1.jpg"
            name="Kinnstorm Jacket"
            category={["jacket"]}
            variant={["Red"]}
            delay={0.5}
            duration={0.3}
            className=" absolute right-32 bottom-[25%]"
          />

          <Card
            img="/products/prod-1.jpg"
            name="Kinnstorm Jacket"
            category={["jacket"]}
            variant={["Red"]}
            delay={0.7}
            duration={0.3}
            className=" absolute right-10 bottom-10"
          />
        </div>
        <Phone />
      </div>

      <Footer />
    </div>
  );
};
export default Home;

export const Phone = () => {
  return (
    <div className="shrink-0 w-[400px] h-[800px] border-[15px] border-black rounded-[50px] flex flex-col overflow-hidden  shadow-md">
      <nav className="relative flex items-center justify-between w-full  px-4">
        <h1 className="">1:34 PM</h1>
        <div className="bg-black w-1/2 h-[30px] rounded-b-3xl" />
        <h1 className="flex items-center gap-2">
          <p className="text-xs">71%</p>
          <Battery className="w-6 h-6" />
        </h1>
      </nav>
      <div className="bg-white-shade w-full h-full flex flex-col overflow-hidden">
        <img
          src="/authbg.jpg"
          alt="auth"
          className="w-full h-[300px] object-cover"
        />
        <div className="h-full w-full flex flex-col p-4 bg-white-shade">
          <span className="flex items-center gap-2">
            <Ellipsis className="w-10 h-10" />
            <p className="title tracking-widest text-xl ">StyleLayerCo.</p>
          </span>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Label className="tracking-widest font-extrabold text-2xl">
              Welcome.
            </Label>
            <span className="w-full flex flex-col gap-1 items-center">
              <p className="w-3/4  tracking-widest">Email</p>
              <Input disabled className="w-3/4" type="email" />
            </span>
            <span className="w-full flex flex-col gap-1 items-center">
              <p className="w-3/4  tracking-widest">Password</p>
              <Input disabled className="w-3/4" type="password" />
            </span>
            <Button className="w-3/4">Login</Button>
            <div className="w-3/4 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Checkbox id="Remember_me" />
                <Label htmlFor="Remember_me">Remember me</Label>
              </span>
              <div>Forgot password</div>
            </div>
          </div>
        </div>
        <div className="text-lg flex items-center justify-center gap-2 p-2">
          <Label>Don't have an account?</Label>
          <div className="font-extrabold text-blue-500">Sign up</div>
        </div>
      </div>
      <footer className="w-full  flex items-center justify-center p-1">
        <div className="w-1/2 h-[10px] rounded-full bg-black/50" />
      </footer>
    </div>
  );
};

type Props = {
  name: string;
  img: string;
  variant: string[];
  category: string[];
  delay?: number;
  duration?: number;
  className?: string;
};

export const Card: React.FC<Props> = ({
  className,
  delay,
  duration,
  category,
  img,
  name,
  variant
}) => {
  return (
    <Popup
      duration={duration}
      delay={delay}
      className={`overflow-hidden w-[300px] border rounded-xl p-2 bg-white shadow-lg flex flex-col gap-1 ${className}`}
    >
      <img
        src={img}
        alt={name}
        className="w-full h-[200px] object-cover object-center rounded-xl"
      />
      <h1 className="pl-1 font-bold text-lg tracking-widest">{name}</h1>

      <div className="flex items-center justify-between p-1">
        <span className="flex flex-col gap-1">
          <h1 className="text-sm font-extrabold">Variant</h1>
          {variant.map((item, i) => (
            <p
              key={i}
              className="rounded-full px-3 py-0.5 text-xs bg-white-shade-light"
            >
              {item}
            </p>
          ))}
        </span>
        <span className="flex flex-col gap-1">
          <h1 className="text-sm font-extrabold">Category</h1>
          {category.map((item, i) => (
            <p
              key={i}
              className="rounded-full px-3 py-0.5 text-xs bg-white-shade-light"
            >
              {item}
            </p>
          ))}
        </span>
      </div>

      <Separator className="my-1" />
      <div className="flex items-center p-1">
        <p className="pr-1">Ratings:</p>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 text-orange-500 ${i + 1 <= 5 && "fill-orange-500"}`}
          />
        ))}
      </div>
    </Popup>
  );
};
