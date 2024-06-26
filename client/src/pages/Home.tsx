import CarouselCards from "@/components/CarouselCards";
import Footer from "@/components/Footer";
import Popup from "@/components/animation/popup";
import { Button } from "@/components/ui/button";
import { LucideArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="w-full">
      <div className="h-full grid grid-cols-[1fr_700px] gap-4 p-8">
        <div className="p-8 relative rounded-3xl bg-black-shade row-span-2 overflow-hidden flex flex-col justify-between ">
          <img
            loading="lazy"
            src={"/pic-2.png"}
            alt="pic2"
            width={600}
            height={600}
            className="z-[1] absolute right-[-5%] bottom-[-25%]"
          />
          <span className="z-[2] ">
            <h1 className="leading-tight tracking-wide text-white w-max h-max text-8xl font-bold">
              Style Flows,
              <br /> Quality Grows.
            </h1>
            <p className="text-background/90 tracking-widest">High quality clothing lines.</p>
          </span>
          <span className="flex items-center gap-2">
            <Button
              className="bg-white shadow-md text-black-shade hover:bg-white/50 rounded-full font-bold text-xl px-8 py-8"
              size={"lg"}>
              Explore Products
            </Button>
            <Button className="bg-white hover:bg-white/50  shadow-md text-black-shade rounded-full font-bold text-2xl py-8">
              <LucideArrowRight className="w-8 h-8" />
            </Button>
          </span>
        </div>

        <CarouselCards />

        <div
          className="h-[370px] flex items-end rounded-3xl p-8 overflow-hidden  bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url(/cap.jpg)" }}>
          <h1 className="text-6xl tracking-wide font-bold text-white"># FASHION</h1>
        </div>
      </div>

      <div className="relative overflow-hidden w-full flex items-center justify-center h-[700px]">
        <h1 className="font-bold text-5xl w-3/4 tracking-widest leading-tight text-center">
          Timeless Fashion for the Modern Man. Trends come and go with the seasons, but our clothing
          captures the essence of <i className="text-rose-400">enduring style</i> and{" "}
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
      <Footer />
    </div>
  );
};
export default Home;
