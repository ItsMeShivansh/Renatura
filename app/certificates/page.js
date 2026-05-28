import { ShieldCheck, FileCheck, Leaf, Globe, Award, CheckCircle, Mail, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { coreStandards, merchantCredentials } from "@/data/certifications";

export const metadata = {
  title: "Compliance & Global Standards — Renatura",
  description: "Renatura's quality assurance, supply chain vetting, and compliance with international compostability standards.",
};

export default function CertificatesPage() {
  return (
    <div className="flex flex-col">
      {/* 1 & 2. Strategic Headline & Sourcing Philosophy */}
      <section className="px-6 lg:px-8 pt-20 pb-24 border-b border-foreground/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection>
            <span className="text-xs font-semibold text-green tracking-widest uppercase">Quality Assurance</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Compliance & <span className="text-green">Global Standards</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed mx-auto">
              Our entire supply chain network is heavily vetted and compliant with strict international environmental and quality standards. We serve as the rigorous gatekeepers of quality, ensuring every product delivered meets global benchmarks.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. The Core Standards List */}
      <section className="px-6 lg:px-8 py-24 border-b border-foreground/5">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-start gap-4 mb-16">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">Product Standards</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Compostability Benchmarks</h2>
            </div>
          </AnimatedSection>
          
          <div className="flex flex-col gap-10">
            {coreStandards.map((cert, i) => (
              <AnimatedSection key={cert.id} delay={i * 0.1}>
                <div className="group flex flex-col sm:flex-row gap-4 sm:gap-10 sm:items-baseline py-4 border-b border-foreground/10 transition-colors hover:border-foreground/30 cursor-default">
                  <h3 className="text-2xl sm:text-3xl font-bold text-green w-48 flex-shrink-0 transition-all duration-300 group-hover:scale-[1.05] origin-left">
                    {cert.code}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/70 leading-relaxed transition-all duration-300 group-hover:text-foreground">
                    {cert.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Merchant Credentials */}
      <section className="px-6 lg:px-8 py-24 border-b border-foreground/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col items-start gap-4 mb-16">
              <span className="text-xs font-semibold text-green tracking-widest uppercase">Corporate Standing</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Merchant Credentials</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {merchantCredentials.map((cred, i) => (
              <AnimatedSection key={cred.id} delay={i * 0.1}>
                <div className="flex flex-col gap-4 p-8 border border-foreground/10 rounded-sm h-full transition-transform duration-300 hover:scale-[1.03] bg-background">
                  <ShieldCheck className="w-8 h-8 text-green" />
                  <h3 className="text-lg font-bold text-foreground">{cred.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {cred.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Verification Protocol */}
      <section className="px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="p-10 border border-green/20 rounded-sm bg-green/5 flex flex-col items-center gap-6">
              <ShieldCheck className="w-12 h-12 text-green" />
              <h2 className="text-2xl font-bold text-foreground">Verification Protocol</h2>
              <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-lg mx-auto">
                Official compliance documentation and redacted testing reports are strictly available for verification only during the formal quoting process to protect our supply chain integrity.
              </p>
              <a 
                href="mailto:compliance@renatura.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105 mt-4"
              >
                Request Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
