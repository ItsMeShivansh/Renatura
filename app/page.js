import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Truck,
  Leaf,
  Recycle,
  Award,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LogoIcon from "@/components/LogoIcon";
import ProductCard from "@/components/ProductCard";
import { products, bestsellers } from "@/data/products";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Certified Compostable",
    description:
      "Every product meets international compostability standards including EN 13432 and ASTM D6400.",
  },
  {
    icon: Truck,
    title: "Reliable Supply Chain",
    description:
      "Consistent production capacity with on-time delivery across 25+ countries worldwide.",
  },
  {
    icon: Globe,
    title: "Global Partnerships",
    description:
      "Trusted by distributors, retailers, and hospitality chains across Europe, Middle East, and Asia.",
  },
  {
    icon: Recycle,
    title: "Zero Waste Process",
    description:
      "Our manufacturing process generates minimal waste — scraps are recycled back into production.",
  },
  {
    icon: Leaf,
    title: "Plant-Based Materials",
    description:
      "Made from cornstarch, sugarcane bagasse, and PLA — 100% renewable and petroleum-free.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description:
      "Rigorous quality control at every stage ensures products that meet the highest standards.",
  },
];

const bestsellerProducts = products.filter((p) => bestsellers.includes(p.id));

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-5">
              <LogoIcon className="h-24 sm:h-32 w-auto object-contain drop-shadow-lg" />
              <span className="text-sm sm:text-base font-bold text-green tracking-widest uppercase">
                Compostable Products
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Return to{" "}
              <span className="text-green">Nature.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl leading-relaxed mx-auto">
              Renatura delivers certified compostable products to businesses and
              consumers worldwide — from carry bags to tableware, every product
              returns to the earth.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/export-import"
                className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 text-foreground text-sm font-medium rounded-sm transition-transform duration-300 hover:scale-105"
              >
                B2B Partnerships
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BESTSELLERS SECTION
      ═══════════════════════════════════════════ */}
      <section className="px-6 lg:px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-20 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                Featured Products
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Bestsellers
              </h2>
              <p className="text-foreground/50 max-w-lg text-lg mx-auto">
                Our most popular compostable products trusted by thousands of businesses.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellerProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="flex justify-center mt-16">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 text-foreground text-sm font-medium rounded-sm transition-transform duration-300 hover:scale-105"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST SECTION
      ═══════════════════════════════════════════ */}
      <section className="px-6 lg:px-8 py-32 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-20 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                Why Renatura
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Trusted Globally
              </h2>
              <p className="text-foreground/50 max-w-lg text-lg mx-auto">
                Why businesses across the world choose Renatura for their sustainable packaging needs.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trustPoints.map((point, i) => (
              <AnimatedSection key={point.title} delay={i * 0.08}>
                <div className="flex flex-col gap-5 p-8 border border-foreground/10 rounded-sm transition-transform duration-300 hover:scale-[1.03]">
                  <point.icon className="w-8 h-8 text-green" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════ */}
      <section className="px-6 lg:px-8 py-32 border-t border-foreground/5">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Interested in our{" "}
              <span className="text-green">products</span>?
            </h2>
            <p className="text-lg text-foreground/50 max-w-xl mx-auto">
              Whether you&apos;re a retailer, distributor, or hospitality chain —
              we&apos;d love to hear from you. Let&apos;s build a sustainable
              future together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-green text-black text-base font-bold rounded-sm transition-transform duration-300 hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
