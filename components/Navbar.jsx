"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import LogoImage from "./LogoImage";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/export-import", label: "Export / Import" },
  { href: "/certificates", label: "Certificates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("/api/links");
        if (res.ok) {
          const data = await res.json();
          setLinks(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch links:", error);
      }
    }
    fetchLinks();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <LogoImage className="h-9 sm:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-transform duration-300 hover:scale-105 inline-block ${
                  pathname === link.href
                    ? "text-green"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Buy Online CTA */}
          <div className="hidden lg:flex items-center gap-4 relative">
            <ThemeToggle />
            {links.length > 0 ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-green text-black text-sm font-semibold rounded-sm transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  Buy Online
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-sm shadow-lg z-50 overflow-hidden">
                    <div className="flex flex-col">
                      {links.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 text-sm text-foreground hover:bg-foreground/5 transition-colors border-b border-foreground/5 last:border-0"
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="https://amazon.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green text-black text-sm font-semibold rounded-sm transition-transform duration-300 hover:scale-105"
              >
                Buy Online
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground transition-transform duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 bg-background border-t border-foreground/10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium transition-transform duration-300 hover:scale-105 inline-block ${
                pathname === link.href
                  ? "text-green"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {links.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs font-semibold text-foreground/45 uppercase tracking-wider pl-1">Buy Online</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green/10 border border-green/20 text-green text-base font-semibold rounded-sm transition-colors hover:bg-green/20"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              href="https://amazon.in"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green text-black text-base font-semibold rounded-sm transition-transform duration-300 hover:scale-105 mt-2"
            >
              Buy Online
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
