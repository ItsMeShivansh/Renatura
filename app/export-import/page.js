import {
  Package,
  Paintbrush,
  Factory,
  Globe,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import B2BForm from "@/components/B2BForm";

export const metadata = {
  title: "Export & Import — Renatura B2B Hub",
  description:
    "Partner with Renatura for bulk compostable product sourcing. Explore MOQs, custom manufacturing, and white-label opportunities for global distribution.",
};

const moqData = [
  {
    category: "W-Cut Bags",
    moq: "5,000 units",
    leadTime: "10–14 days",
    customization: "Printing, sizing, material blend",
  },
  {
    category: "D-Cut Bags",
    moq: "5,000 units",
    leadTime: "10–14 days",
    customization: "Printing, sizing, handle style",
  },
  {
    category: "Tableware",
    moq: "2,000 units",
    leadTime: "14–21 days",
    customization: "Compartments, sizing, embossing",
  },
  {
    category: "Food Packaging",
    moq: "1,500 units",
    leadTime: "14–21 days",
    customization: "Shape, lid options, branding",
  },
  {
    category: "Specialty Items",
    moq: "1,000 units",
    leadTime: "7–14 days",
    customization: "Material, sizing, bundling",
  },
];

const capabilities = [
  {
    icon: Paintbrush,
    title: "Custom Branding",
    description:
      "Full-color printing, embossing, and custom packaging design to match your brand identity.",
  },
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description:
      "Bespoke product dimensions, material formulations, and tooling for unique product shapes.",
  },
  {
    icon: Package,
    title: "White-Label Solutions",
    description:
      "Ready-to-sell products under your brand with custom packaging and labeling at scale.",
  },
  {
    icon: Globe,
    title: "Global Logistics",
    description:
      "End-to-end export support including documentation, compliance certificates, and freight coordination.",
  },
];

export default function ExportImportPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection>
            <span className="text-xs font-semibold text-green tracking-widest uppercase">
              B2B Partnerships
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Global{" "}
              <span className="text-green">Export & Import</span>
              <br />
              Hub
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed mx-auto">
              Scale your sustainable product line with Renatura. We provide
              reliable bulk manufacturing, competitive MOQs, and full
              customization capabilities for businesses worldwide.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* MOQ Table */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-16 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                Minimum Order Quantities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                MOQ by Category
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moqData.map((item, i) => (
                <div
                  key={item.category}
                  className="p-8 border border-foreground/10 rounded-sm flex flex-col gap-5 transition-transform duration-300 hover:scale-105"
                >
                  <h3 className="text-lg font-semibold text-green">
                    {item.category}
                  </h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Minimum Order</span>
                      <span className="text-foreground font-medium">
                        {item.moq}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Lead Time</span>
                      <span className="text-foreground font-medium">
                        {item.leadTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Customization</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">
                        {item.customization}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-16 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Capabilities
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={cap.title} delay={i * 0.1}>
                <div className="flex gap-6 p-8 border border-foreground/10 rounded-sm transition-transform duration-300 hover:scale-105">
                  <cap.icon className="w-8 h-8 text-green flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-foreground/50 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Inquiry Form */}
      <section className="px-6 lg:px-8 py-24 border-t border-foreground/5">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-16 text-center">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Submit Your Inquiry
              </h2>
              <p className="text-foreground/50 max-w-lg text-base mx-auto">
                Fill out the form below and our B2B team will get back to you
                within 24–48 hours with pricing and availability.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <B2BForm />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
