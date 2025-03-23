import { useState } from "react";
import { FlickTranslateCarousel } from "./FlickTranslateCarousel";
import "./styles.css";
import { TranslateCarousel } from "./TranslateCarousel";

export default function App() {
  const [carouselCount, setCarouselCount] = useState(1);
  return (
    <div className="App">
      <h1>TranslateCarousel</h1>
      <div>
        <p>カルーセルの数: {carouselCount}</p>
        <button onClick={() => setCarouselCount((prev) => prev + 1)}>
          追加
        </button>
        <button
          onClick={() => setCarouselCount((prev) => Math.max(1, prev - 1))}
        >
          削除
        </button>
      </div>
      {Array.from({ length: carouselCount }).map((_, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <FlickTranslateCarousel dragThreshold={20} />
        </div>
      ))}
    </div>
  );
}
