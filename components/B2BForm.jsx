"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const volumeOptions = [
  "Select Order Volume",
  "1,000 — 5,000 units",
  "5,000 — 10,000 units",
  "10,000 — 25,000 units",
  "25,000 — 50,000 units",
  "50,000 — 100,000 units",
  "100,000+ units",
  "Custom / Not Sure",
];

export default function B2BForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    volume: "",
    message: "",
    requestSample: false,
    shippingAddress: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/b2b-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          volume: "",
          message: "",
          requestSample: false,
          shippingAddress: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-16 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green" />
        <h3 className="text-2xl font-bold text-foreground">Inquiry Submitted</h3>
        <p className="text-foreground/60 max-w-md">
          Thank you for your interest. Our team will review your requirements and get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-8 py-3 border border-foreground/20 text-foreground rounded-sm text-sm font-medium transition-transform duration-300 hover:scale-105"
        >
          Submit Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Name & Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/70">
            Full Name <span className="text-green">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground focus:border-green transition-colors duration-300"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/70">
            Company Name <span className="text-green">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground focus:border-green transition-colors duration-300"
            placeholder="Your company"
          />
        </div>
      </div>

      {/* Email & Volume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/70">
            Email <span className="text-green">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground focus:border-green transition-colors duration-300"
            placeholder="you@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/70">
            Order Volume <span className="text-green">*</span>
          </label>
          <div className="relative">
            <select
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm focus:border-green transition-colors duration-300 appearance-none cursor-pointer"
            >
              {volumeOptions.map((opt) => (
                <option key={opt} value={opt === "Select Order Volume" ? "" : opt} className="bg-background text-foreground">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground/70">
          Custom Message / Requirements
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground focus:border-green transition-colors duration-300 resize-none"
          placeholder="Tell us about your specific requirements, custom branding needs, or any questions..."
        />
      </div>

      {/* Request Sample Checkbox */}
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              name="requestSample"
              checked={formData.requestSample}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-foreground/30 rounded-sm peer-checked:bg-green peer-checked:border-green transition-all duration-300" />
            <svg
              className="absolute top-0.5 left-0.5 w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8L6.5 11.5L13 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm text-foreground font-medium transition-transform duration-300 group-hover:scale-105">
            Request a Sample
          </span>
        </label>

        {/* Conditional Shipping Address */}
        <AnimatePresence>
          {formData.requestSample && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-sm font-medium text-foreground/70">
                  Shipping Address <span className="text-green">*</span>
                </label>
                <textarea
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  required={formData.requestSample}
                  rows={3}
                  className="w-full px-5 py-3.5 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground focus:border-green transition-colors duration-300 resize-none"
                  placeholder="Full shipping address for sample delivery..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-foreground text-sm">
          <AlertCircle className="w-4 h-4 text-green" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-10 py-4 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-sm animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit Inquiry
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
