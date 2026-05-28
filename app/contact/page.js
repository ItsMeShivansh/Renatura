"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const subjectOptions = ["General Inquiry", "Press & Media", "Local Vendor Support", "Product Question", "Other"];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
              {status === "success" ? (
                <div className="flex flex-col items-center gap-6 py-16 text-center">
                  <CheckCircle className="w-16 h-16 text-green" />
                  <h3 className="text-2xl font-bold text-foreground">Message Sent</h3>
                  <p className="text-foreground/60 max-w-md mx-auto">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="px-8 py-3 border border-foreground/20 text-foreground rounded-sm text-sm font-medium transition-transform duration-300 hover:scale-105">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground/70">Full Name <span className="text-green">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm focus:border-green transition-colors duration-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground/70">Email <span className="text-green">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm focus:border-green transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground/70">Subject <span className="text-green">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm focus:border-green transition-colors duration-300 appearance-none cursor-pointer">
                      <option value="" className="bg-background">Select a subject</option>
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-background">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground/70">Message <span className="text-green">*</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your message..." className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm focus:border-green transition-colors duration-300 resize-none" />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm"><AlertCircle className="w-4 h-4 text-green" /> Something went wrong.</div>
                  )}

                  <button type="submit" disabled={status === "loading"} className="flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-10 py-4 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105 disabled:opacity-50">
                    {status === "loading" ? (
                      <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-sm animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
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
