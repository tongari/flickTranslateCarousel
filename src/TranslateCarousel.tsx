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

  // 表示用の配列を作成（最後に最初のスライドを追加）
  const displaySlides = [...slides, slides[0]];

  useEffect(() => {
    if (!trackRef.current) return;

    const firstSlide = trackRef.current.querySelector(".carousel-slide");
    if (!firstSlide) return;

    const slideWidth = firstSlide.clientWidth;
    const totalWidth = slideWidth * slides.length;

    let animationFrameId: number;
    let startTime: number | null = null;
    const speed = 0.05; // ピクセル/ミリ秒

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const newOffset = elapsed * speed;

      if (newOffset >= totalWidth) {
        // 最後まで来たら最初に瞬時に戻る
        startTime = currentTime;
        setOffset(0);
      } else {
        setOffset(newOffset);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        ref={trackRef}
        style={{
          transform: `translateX(-${offset}px)`,
          transition: "transform 0s linear",
        }}
      >
        {displaySlides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.src} alt={slide.alt} draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
};
