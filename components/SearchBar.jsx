"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, resultCount }) {
  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products by name, category, material..."
          className="w-full pl-12 pr-12 py-4 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/30 focus:border-green focus:outline-none transition-colors duration-300"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 transition-transform duration-300 hover:scale-110"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {value && (
        <p className="text-center text-xs text-foreground/40 mt-3">
          {resultCount} {resultCount === 1 ? "result" : "results"} found
        </p>
      )}
    </div>
  );
}
