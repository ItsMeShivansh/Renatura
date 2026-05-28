"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import InquiryForm from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimatedSection>
            <span className="text-xs font-semibold text-green tracking-widest uppercase">Get In Touch</span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Contact <span className="text-green">Us</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed mx-auto">
              Have a question, partnership proposal, or need support? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 lg:px-8 py-16 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatedSection>
              <InquiryForm defaultSubject="General Inquiry" />
            </AnimatedSection>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.15}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 p-8 border border-foreground/10 rounded-sm">
                  <h3 className="text-lg font-semibold text-foreground">Company Details</h3>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground/50 mb-1">Email</p>
                        <a href="mailto:hello@renatura.com" className="text-sm text-foreground font-medium transition-transform duration-300 hover:scale-105 inline-block">hello@renatura.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground/50 mb-1">Phone</p>
                        <a href="tel:+919876543210" className="text-sm text-foreground font-medium transition-transform duration-300 hover:scale-105 inline-block">+91 98765 43210</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground/50 mb-1">Location</p>
                        <p className="text-sm text-foreground font-medium">Gujarat, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-green/20 rounded-sm bg-green/5">
                  <h3 className="text-lg font-semibold text-green mb-3">B2B Inquiries?</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">For bulk orders, export quotes, and custom manufacturing — visit our dedicated <a href="/export-import" className="text-green font-medium transition-transform duration-300 hover:scale-105 inline-block">Export & Import Hub</a>.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
