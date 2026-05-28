"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images = [], productName = "Product" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasImages = images.length > 0;

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const goNext = () => {
    if (activeIndex < images.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  if (!hasImages) {
    return (
      <div className="w-full aspect-square rounded-sm bg-[#F4EBDD]/5 border border-[#F4EBDD]/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#F4EBDD]/20">
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none" className="text-[#F4EBDD]/30">
            <rect x="8" y="12" width="32" height="28" rx="1" stroke="currentColor" strokeWidth="2" />
            <path d="M16 12V8C16 5.79086 17.7909 4 20 4H28C30.2091 4 32 5.79086 32 8V12" stroke="currentColor" strokeWidth="2" />
            <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-sm">No Images Available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image display */}
      <div className="relative w-full aspect-square rounded-sm bg-[#F4EBDD]/5 border border-[#F4EBDD]/10 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${productName} - Image ${activeIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white disabled:opacity-30 transition-all hover:bg-black/70"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              disabled={activeIndex === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white disabled:opacity-30 transition-all hover:bg-black/70"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-green scale-105"
                  : "border-[#F4EBDD]/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
