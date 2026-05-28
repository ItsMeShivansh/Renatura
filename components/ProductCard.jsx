"use client";

import { ExternalLink } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group border border-[#F4EBDD]/10 rounded-sm p-6 flex flex-col gap-5 transition-transform duration-300 hover:scale-[1.03] bg-secondary h-full">
      {/* Product image placeholder */}
      <div className="w-full aspect-square rounded-sm bg-[#F4EBDD]/5 border border-[#F4EBDD]/5 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-2 text-[#F4EBDD]/20">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="text-[#F4EBDD]/30"
          >
            <rect
              x="8"
              y="12"
              width="32"
              height="28"
              rx="1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 12V8C16 5.79086 17.7909 4 20 4H28C30.2091 4 32 5.79086 32 8V12"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-xs">Product Image</span>
        </div>
      </div>

      {/* Category badge */}
      <span className="text-xs font-semibold text-[#F4EBDD] tracking-widest uppercase">
        {product.category}
      </span>

      {/* Product name */}
      <h3 className="text-lg font-semibold text-[#F4EBDD] leading-tight">
        {product.name}
      </h3>

      {/* Details */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#F4EBDD]/50">Dimensions</span>
          <span className="text-[#F4EBDD]">{product.dimensions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#F4EBDD]/50">Material</span>
          <span className="text-[#F4EBDD]">{product.material}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#F4EBDD]/50">MOQ</span>
          <span className="text-[#F4EBDD]">{product.moq}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#F4EBDD]/50">Price</span>
          <span className="text-[#F4EBDD] font-medium">{product.price}</span>
        </div>
      </div>

      {/* Certification badge */}
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 text-xs font-medium border border-[#F4EBDD]/30 text-[#F4EBDD] rounded-sm">
          {product.certification}
        </span>
      </div>

      {/* Buy button */}
      <a
        href={product.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#F4EBDD] text-[#1A1A1A] text-sm font-semibold rounded-sm transition-transform duration-300 hover:scale-105"
      >
        Buy on Amazon
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
