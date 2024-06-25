import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const data = [
  {
    url: "/products/prod-2.jpg",
    alt: "pic2",
    text: "Timeless",
  },
  {
    url: "/products/prod-10.jpg",
    alt: "pic10",
    text: "Trends",
  },
  {
    url: "/products/prod-11.jpg",
    alt: "pic11",
    text: "Eternal",
  },
  {
    url: "/products/prod-8.jpg",
    alt: "pic8",
    text: "Coolness",
  },
];

const CarouselCards = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="flex items-center justify-center w-full h-max"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {data.map((item, i) => (
          <CarouselItem key={i} className="basis-1/2">
            <div className=" h-[370px] relative flex items-end rounded-3xl p-8 overflow-hidden object-cover object-center">
              <img
                loading="lazy"
                src={item.url}
                alt={item.alt}
                width={700}
                height={370}
                className="absolute top-0 left-0 "
              />
              <h1 className="whitespace-nowrap text-4xl tracking-wide font-bold text-white z-10">
                # {item.text}{" "}
              </h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export default CarouselCards;
