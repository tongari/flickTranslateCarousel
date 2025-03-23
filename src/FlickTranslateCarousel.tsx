// Flick comparison between translateX and scrollLeft (React)
import { useRef, useEffect, useState } from "react";
import "./styles.css";

interface FlickTranslateCarouselProps {
  dragThreshold?: number;
}

export const FlickTranslateCarousel = ({
  dragThreshold = 20,
}: FlickTranslateCarouselProps) => {
  const containerRef = useRef<any>(null);
  const trackRef = useRef<any>(null);
  const [position, setPosition] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartX = useRef(0);

  // スライド画像の配列を定義
  const slides = [
    { src: "/img/1114_water_hamon_9514.jpg", alt: "スライド1" },
    {
      src: "/img/aerial-shot-megapolis-with-illuminated-high-buildings.jpg",
      alt: "スライド2",
    },
    { src: "/img/beautiful-rainbow-nature.jpg", alt: "スライド3" },
    {
      src: "/img/pexels-ryutaro-tsukata-6249250.jpeg",
      alt: "スライド4",
    },
    {
      src: "/img/photo-1718287888958-efa8b9c8375a.jpeg",
      alt: "スライド5",
    },
  ];

  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragStartX.current = e.clientX;
  };

  const handleTouchStart = (e: TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    dragStartX.current = e.touches[0].clientX;
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    setPosition((prev) => {
      const newPosition = prev + dx;
      // console.log("Move - Position:", newPosition, "dx:", dx);
      return newPosition;
    });
    startX.current = e.clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // スクロールを防止
    const dx = e.touches[0].clientX - startX.current;
    setPosition((prev) => {
      const newPosition = prev + dx;
      return newPosition;
    });
    startX.current = e.touches[0].clientX;
  };

  const handleDragEnd = (endX: number) => {
    isDragging.current = false;

    const track = trackRef.current;
    const slides = track.querySelectorAll(".carousel-slide");
    const dragDistance = endX - dragStartX.current;

    const slideWidth = slides[0].offsetWidth;

    setPosition((currentPosition) => {
      const currentIndex = Math.round(-currentPosition / slideWidth);

      let targetIndex = currentIndex;
      if (Math.abs(dragDistance) > dragThreshold) {
        if (dragDistance < 0 && currentIndex < slides.length - 1) {
          targetIndex = currentIndex + 1;
        } else if (dragDistance > 0 && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        }
      }

      const targetX = -(targetIndex * slideWidth);
      return targetX;
    });
  };

  const handleMouseUp = (e: any) => {
    handleDragEnd(e.clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.changedTouches.length === 0) return;
    handleDragEnd(e.changedTouches[0].clientX);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    if (isDragging.current) {
      handleDragEnd(e.clientX);
    }
    isDragging.current = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const slides = track.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    setPosition(0);

    // マウスイベント
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    // タッチイベント
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      // マウスイベントの削除
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);

      // タッチイベントの削除
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="carousel-container" ref={containerRef}>
      <div
        className="carousel-track"
        ref={trackRef}
        style={{
          transform: `translateX(${position}px)`,
          transition: isDragging.current ? "none" : "transform 0.3s",
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
