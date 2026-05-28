"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  // Get the first image from the images array
  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
  // Also support legacy single image field
  const displayImage = firstImage || (product.image && product.image !== "/products/placeholder.svg" ? product.image : null);

  // Build a dimension summary
  const dims = [];
  if (product.diameter) dims.push(`⌀${product.diameter}mm`);
  if (product.length && product.width) dims.push(`${product.length}×${product.width}mm`);
  if (product.height) dims.push(`H${product.height}mm`);
  // Fallback to legacy dimensions field
  const dimensionStr = dims.length > 0 ? dims.join(" ") : product.dimensions || "—";

  return (
    <Link href={`/products/${encodeURIComponent(product.id)}`} className="block h-full">
      <div className="group border border-[#F4EBDD]/10 rounded-sm p-6 flex flex-col gap-5 transition-all duration-300 hover:scale-[1.01] hover:border-[#F4EBDD]/20 bg-secondary h-full cursor-pointer">
        {/* Product image */}
        <div className="w-full aspect-square rounded-sm bg-[#F4EBDD]/5 border border-[#F4EBDD]/5 flex items-center justify-center overflow-hidden relative">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#F4EBDD]/20">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="text-[#F4EBDD]/30"
              >
                <rect x="8" y="12" width="32" height="28" rx="1" stroke="currentColor" strokeWidth="2" />
                <path d="M16 12V8C16 5.79086 17.7909 4 20 4H28C30.2091 4 32 5.79086 32 8V12" stroke="currentColor" strokeWidth="2" />
                <circle cx="24" cy="26" r="6" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="text-xs">Product Image</span>
            </div>
          )}

          {/* Image count badge */}
          {product.images && product.images.length > 1 && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-[10px] text-white font-medium">
              +{product.images.length - 1}
            </div>
          )}
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
            <span className="text-[#F4EBDD] text-right">{dimensionStr}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#F4EBDD]/50">Material</span>
            <span className="text-[#F4EBDD]">{product.material}</span>
          </div>
          {(product.moq || product.packQty) && (
            <div className="flex justify-between">
              <span className="text-[#F4EBDD]/50">{product.packQty ? "Pack Qty" : "MOQ"}</span>
              <span className="text-[#F4EBDD]">{product.packQty ? `${product.packQty} pcs` : product.moq}</span>
            </div>
          )}
        </div>

        {/* View Details button */}
        <div
          className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#F4EBDD] text-[#1A1A1A] text-sm font-semibold rounded-sm transition-all duration-300 group-hover:bg-green group-hover:scale-105"
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
