"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface HeroImageCarouselProps {
  images: { id: number; src: string }[];
}

const HeroImageCarousel = ({ images }: HeroImageCarouselProps) => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    if (!carouselApi) return;
    autoplayRef.current = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);
  }, [carouselApi, stopAutoplay]);

  React.useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    setCurrent(carouselApi.selectedScrollSnap());

    startAutoplay();
    return () => {
      stopAutoplay();
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, startAutoplay, stopAutoplay]);

  if (!images.length) return null;

  return (
    <Carousel
      className="w-full h-full"
      setApi={setCarouselApi}
      onMouseEnter={stopAutoplay}
      onFocusCapture={stopAutoplay}
      onMouseLeave={startAutoplay}
      onBlurCapture={startAutoplay}
    >
      <CarouselContent className="ml-0">
        {images.map((slide) => (
          <CarouselItem key={slide.id} className="pl-0 relative h-full">
            <div className="relative aspect-4/3 lg:aspect-auto lg:h-145 w-full">
              <Image
                src={slide.src}
                alt={`Hero slide ${slide.id}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700"
                priority={slide.id === 1}
                unoptimized
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {images.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => carouselApi?.scrollTo(index)}
            className="group/dot cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-white"
                  : "w-6 bg-white/40 group-hover/dot:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </Carousel>
  );
};

export default HeroImageCarousel;
