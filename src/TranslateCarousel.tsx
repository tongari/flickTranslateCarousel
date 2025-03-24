import { useEffect, useRef, useState } from "react";

export const TranslateCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  // スライド画像の配列を定義
  const slides = [
    { src: "/img/beautiful-rainbow-nature.jpg", alt: "スライド1" },
    {
      src: "/img/aerial-shot-megapolis-with-illuminated-high-buildings.jpg",
      alt: "スライド2",
    },
    { src: "/img/1114_water_hamon_9514.jpg", alt: "スライド3" },
    {
      src: "/img/pexels-ryutaro-tsukata-6249250.jpeg",
      alt: "スライド4",
    },
    {
      src: "/img/photo-1718287888958-efa8b9c8375a.jpeg",
      alt: "スライド5",
    },
  ];

  useEffect(() => {
    if (!trackRef.current) return;

    const firstSlide = trackRef.current.querySelector(".carousel-slide");
    if (!firstSlide) return;

    const slideWidth = firstSlide.clientWidth; // 実際のスライド幅を取得
    const totalWidth = slideWidth * slides.length;

    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % totalWidth);
    }, 16);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        ref={trackRef}
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0s",
        }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
};
