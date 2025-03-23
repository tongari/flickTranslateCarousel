import { useEffect, useRef, useState } from "react";

export const TranslateCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 900); // 300px × 3 slides
    }, 16); // 約60fps

    return () => clearInterval(interval);
  }, []);

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
        <div className="carousel-slide">A</div>
        <div className="carousel-slide">B</div>
        <div className="carousel-slide">C</div>
      </div>
    </div>
  );
};
