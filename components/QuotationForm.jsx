"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuotationForm({ productName = "", productSku = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "Product Quotation",
    message: "",
    approxOrderQuantity: "",
    requestSample: false,
    shippingAddress: "",
    productName: productName,
    productSku: productSku,
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
      const res = await fetch("/api/inquiries", {
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
          subject: "Product Quotation",
          message: "",
          approxOrderQuantity: "",
          requestSample: false,
          shippingAddress: "",
          productName: productName,
          productSku: productSku,
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
        className="flex flex-col items-center gap-6 py-12 text-center"
      >
        <CheckCircle className="w-14 h-14 text-green" />
        <h3 className="text-xl font-bold text-foreground">Quotation Request Submitted</h3>
        <p className="text-foreground/60 max-w-md text-sm">
          Thank you for your interest in <span className="font-medium text-foreground">{productName}</span>. Our team will review your requirements and get back to you within 24–48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 border border-foreground/20 text-foreground rounded-sm text-sm font-medium transition-transform duration-300 hover:scale-105"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Product reference (read-only) */}
      {productName && (
        <div className="px-4 py-3 bg-green/10 border border-green/20 rounded-sm">
          <p className="text-sm text-foreground/70">
            Requesting quotation for: <span className="font-semibold text-green">{productName}</span>
          </p>
        </div>
      )}

      {/* Name & Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="quot-name" className="text-sm font-medium text-foreground/70">
            Full Name <span className="text-green">*</span>
          </label>
          <input
            id="quot-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quot-company" className="text-sm font-medium text-foreground/70">
            Company Name <span className="text-green">*</span>
          </label>
          <input
            id="quot-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            autoComplete="organization"
            className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300"
            placeholder="Your company"
          />
        </div>
      </div>

      {/* Email & Approx Order Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="quot-email" className="text-sm font-medium text-foreground/70">
            Email <span className="text-green">*</span>
          </label>
          <input
            id="quot-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300"
            placeholder="you@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quot-quantity" className="text-sm font-medium text-foreground/70">
            Approx. Order Quantity <span className="text-green">*</span>
          </label>
          <input
            id="quot-quantity"
            type="text"
            name="approxOrderQuantity"
            value={formData.approxOrderQuantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300"
            placeholder="e.g. 5,000 units, 10 boxes"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="quot-message" className="text-sm font-medium text-foreground/70">
          Message / Requirements <span className="text-green">*</span>
        </label>
        <textarea
          id="quot-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300 resize-none"
          placeholder="Tell us about your specific requirements, custom branding needs, delivery timeline..."
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
              <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
                <label htmlFor="quot-shipping" className="text-sm font-medium text-foreground/70">
                  Shipping Address <span className="text-green">*</span>
                </label>
                <textarea
                  id="quot-shipping"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  required={formData.requestSample}
                  rows={3}
                  className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-sm text-foreground text-sm placeholder:text-foreground/40 focus:border-green transition-colors duration-300 resize-none"
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
        className="flex items-center justify-center gap-2 w-full md:w-auto md:self-start px-8 py-3.5 bg-green text-black text-sm font-bold rounded-sm transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request Quotation
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
