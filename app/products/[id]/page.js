"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Package, Layers, Ruler, Weight, CircleDot, FileText, Tag, Loader2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageGallery from "@/components/ImageGallery";
import QuotationForm from "@/components/QuotationForm";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-green animate-spin" />
          <p className="text-foreground/40 text-sm">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center flex flex-col items-center gap-6">
          <Package className="w-16 h-16 text-foreground/20" />
          <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
          <p className="text-foreground/50 max-w-md">The product you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Build dimensions string from available measurements
  const dimensions = [];
  if (product.diameter) dimensions.push(`⌀ ${product.diameter}mm`);
  if (product.length) dimensions.push(`${product.length}mm L`);
  if (product.width) dimensions.push(`${product.width}mm W`);
  if (product.height) dimensions.push(`${product.height}mm H`);
  const dimensionStr = dimensions.join(" × ") || "—";

  // Specification items
  const specs = [
    { icon: Package, label: "Category", value: product.category },
    { icon: Layers, label: "Material", value: product.material },
    { icon: Ruler, label: "Dimensions", value: dimensionStr },
    { icon: Weight, label: "Weight", value: product.weight ? `${product.weight}g` : "—" },
    { icon: CircleDot, label: "Thickness", value: product.thickness ? `${product.thickness}mm` : "—" },
    { icon: Package, label: "Pack Qty", value: product.packQty ? `${product.packQty} pcs/box` : "—" },
  ];

  // Only show non-null specs
  const visibleSpecs = specs.filter(s => s.value && s.value !== "—");

  return (
    <div className="flex flex-col pb-32">
      {/* Breadcrumb */}
      <section className="px-6 lg:px-8 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-green transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Content */}
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <AnimatedSection>
            <ImageGallery images={product.images || []} productName={product.name} />
          </AnimatedSection>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col gap-4">
                {/* Category badge */}
                <span className="text-xs font-semibold text-green tracking-widest uppercase">
                  {product.category}
                </span>

                {/* Product name */}
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>

                {/* SKU */}
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-foreground/30" />
                  <span className="text-sm text-foreground/40">SKU: {product.id}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Description */}
            {product.usage && (
              <AnimatedSection delay={0.15}>
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Description & Usage
                  </h2>
                  <p className="text-foreground/60 leading-relaxed text-sm">
                    {product.usage}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Specifications Grid */}
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-4">
                <h2 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {visibleSpecs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1.5 p-4 bg-foreground/5 border border-foreground/10 rounded-sm">
                      <div className="flex items-center gap-2 text-foreground/40">
                        <spec.icon className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">{spec.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Additional pack info */}
                {(product.sleevesPerBox || product.pcsPerSleeve) && (
                  <div className="flex gap-4 text-sm text-foreground/50">
                    {product.sleevesPerBox && (
                      <span>{product.sleevesPerBox} sleeves/box</span>
                    )}
                    {product.pcsPerSleeve && (
                      <span>{product.pcsPerSleeve} pcs/sleeve</span>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Keywords / Features */}
            {product.keywords && (
              <AnimatedSection delay={0.25}>
                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
                    Key Features
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.keywords.split(",").map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium border border-foreground/20 text-foreground/70 rounded-full"
                      >
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Brand */}
            {product.brand && (
              <AnimatedSection delay={0.3}>
                <div className="px-4 py-3 bg-green/10 border border-green/20 rounded-sm">
                  <p className="text-sm text-foreground/70">
                    Brand: <span className="font-semibold text-green">{product.brand}</span>
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Quotation Form Section */}
      <section className="px-6 lg:px-8 mt-24">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-3 mb-10 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                Get a Quote
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Request Quotation
              </h2>
              <p className="text-foreground/50 max-w-lg mx-auto">
                Interested in this product? Fill out the form below and our team will get back to you with pricing and availability.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="p-8 border border-foreground/10 rounded-sm bg-foreground/[0.02]">
              <QuotationForm productName={product.name} productSku={product.id} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
