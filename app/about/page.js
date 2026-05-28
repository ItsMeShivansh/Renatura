import { Leaf, Recycle, Heart, Target } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "About Us — Renatura",
  description: "Learn about Renatura's mission to replace single-use plastics with certified compostable alternatives.",
};

const timeline = [
  { phase: "Raw Materials", description: "We source plant-based raw materials — cornstarch, sugarcane bagasse, and PLA — from sustainable agricultural supply chains." },
  { phase: "Manufacturing", description: "Our production facilities use energy-efficient processes to convert raw biomass into finished compostable products." },
  { phase: "Distribution", description: "Products are packaged in minimal, recyclable packaging and shipped to B2B and retail partners across 25+ countries." },
  { phase: "Consumer Use", description: "End consumers use our products as direct replacements for conventional single-use plastics — same convenience, zero guilt." },
  { phase: "Composting", description: "After use, products are disposed in industrial or home composting systems where they break down into nutrient-rich biomass." },
  { phase: "Return to Earth", description: "Within 90–180 days, the material fully decomposes, returning nutrients to the soil and completing the lifecycle loop." },
];

const values = [
  { icon: Leaf, title: "Sustainability First", description: "Every decision we make — from sourcing to shipping — is filtered through an environmental impact lens." },
  { icon: Recycle, title: "Circular Economy", description: "Our products are designed to be part of a closed-loop system, returning to the earth after use." },
  { icon: Heart, title: "Community Impact", description: "We work with local agricultural communities, creating fair-wage jobs in sustainable material sourcing." },
  { icon: Target, title: "Innovation Driven", description: "We invest in R&D to continuously improve material performance, compostability timelines, and production efficiency." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <AnimatedSection>
            <span className="text-xs font-semibold text-green tracking-widest uppercase">Our Story</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Building a <span className="text-green">Compostable</span> Future
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed mx-auto">
              Renatura was founded with a singular mission: to replace every single-use plastic product with a compostable alternative that performs just as well and returns to the earth after use.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col gap-8">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">Our Vision</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                A world where packaging never becomes waste — where every product we make nourishes the earth it came from.
              </h2>
              <div className="flex flex-col gap-6 text-base text-foreground/60 leading-relaxed">
                <AnimatedSection delay={0.1}>
                  <p>We believe the plastic crisis is not a consumer problem — it&apos;s a design problem. Single-use products don&apos;t need to last forever. They need to do their job and then disappear, cleanly and safely.</p>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <p>That&apos;s why every Renatura product is engineered to be functionally identical to its plastic counterpart during use, but fundamentally different after disposal. Our compostable bags carry the same weight. Our tableware handles the same heat. Our food packaging preserves the same freshness.</p>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <p>The only difference? Within 180 days, they&apos;re gone — returned to the soil as nutrient-rich compost, completing a cycle that began in a field and ends in a field.</p>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Lifecycle */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-16 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">Full Circle</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Product Lifecycle</h2>
              <p className="text-foreground/50 max-w-lg text-base mx-auto">From plant to product and back to earth.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((step, i) => (
              <AnimatedSection key={step.phase} delay={i * 0.1}>
                <div className="relative flex flex-col gap-4 p-8 border border-foreground/10 rounded-sm transition-transform duration-300 hover:scale-105">
                  <span className="text-3xl font-bold text-green/20">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-semibold text-green">{step.phase}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-16 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">What Drives Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Our Values</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, i) => (
              <AnimatedSection key={val.title} delay={i * 0.1}>
                <div className="flex gap-6 p-8 border border-foreground/10 rounded-sm transition-transform duration-300 hover:scale-105">
                  <val.icon className="w-8 h-8 text-green flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{val.title}</h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
