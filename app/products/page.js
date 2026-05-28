"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { categories } from "@/data/products";

const ITEMS_PER_PAGE = 9;

const fuseOptions = {
  keys: [
    { name: "name", weight: 0.35 },
    { name: "category", weight: 0.25 },
    { name: "material", weight: 0.15 },
    { name: "keywords", weight: 0.15 },
    { name: "usage", weight: 0.10 },
  ],
  threshold: 0.3,
  includeScore: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceRef = useRef(null);

  // Fetch products dynamically from API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const fuse = useMemo(() => new Fuse(products, fuseOptions), [products]);

  // Debounced search handler
  const handleSearch = useCallback(
    (query) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSearchQuery(query);
        setDisplayCount(ITEMS_PER_PAGE);
      }, 300);
    },
    []
  );

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Apply fuzzy search
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      const searchIds = new Set(searchResults.map((r) => r.item.id));

      if (activeCategory !== "All") {
        result = result.filter((p) => searchIds.has(p.id));
      } else {
        result = searchResults.map((r) => r.item);
      }
    }

    return result;
  }, [searchQuery, activeCategory, fuse]);

  // Visible products (paginated)
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, displayCount),
    [filteredProducts, displayCount]
  );

  const hasMore = displayCount < filteredProducts.length;

  // Intersection observer for infinite scroll
  const { ref: sentinelRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      // Simulate a slight delay for smooth UX
      const timer = setTimeout(() => {
        setDisplayCount((prev) => prev + 6);
        setIsLoadingMore(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [inView, hasMore, isLoadingMore]);

  // Local search input state for controlled input
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (val) => {
    setInputValue(val);
    handleSearch(val);
  };

  const onClear = () => {
    setInputValue("");
    setSearchQuery("");
    setDisplayCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection>
            <span className="text-xs font-semibold text-green tracking-widest uppercase">
              Our Products
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Product Catalog
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-foreground/50 max-w-lg text-lg mx-auto">
              Browse our complete range of certified compostable products. Search, filter, and find exactly what you need.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <AnimatedSection delay={0.2}>
            <SearchBar
              value={inputValue}
              onChange={onInputChange}
              onClear={onClear}
              resultCount={filteredProducts.length}
            />
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setDisplayCount(ITEMS_PER_PAGE);
                  }}
                  className={`px-5 py-2 text-sm font-medium rounded-sm border transition-transform duration-300 hover:scale-105 ${
                    activeCategory === cat
                      ? "bg-green text-black border-green"
                      : "bg-background text-foreground border-foreground/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-green animate-spin" />
              <p className="text-foreground/40 text-sm">Loading product catalog...</p>
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-foreground/40 text-lg">
                No products found matching your search.
              </p>
              <button
                onClick={onClear}
                className="mt-6 px-6 py-2.5 border border-foreground/20 text-foreground text-sm rounded-sm transition-transform duration-300 hover:scale-105"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProducts.map((product, i) => (
                  <AnimatedSection key={product.id} delay={(i % 3) * 0.05}>
                    <ProductCard product={product} />
                  </AnimatedSection>
                ))}
              </div>

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div
                  ref={sentinelRef}
                  className="flex items-center justify-center py-16"
                >
                  {isLoadingMore && (
                    <Loader2 className="w-6 h-6 text-green animate-spin" />
                  )}
                </div>
              )}

              {/* End of list */}
              {!hasMore && visibleProducts.length > 0 && (
                <p className="text-center text-foreground/30 text-sm mt-16">
                  Showing all {filteredProducts.length} products
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
