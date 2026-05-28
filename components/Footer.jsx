import Link from "next/link";
import LogoImage from "./LogoImage";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/export-import", label: "Export / Import" },
  { href: "/certificates", label: "Certificates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-[#F4EBDD]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link
              href="/"
              className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <LogoImage forceDark={true} className="h-10 sm:h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-[#F4EBDD]/60 max-w-xs leading-relaxed text-center lg:text-left">
              Return to Nature
              <br />
              Compostable products for a sustainable future.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-8 lg:gap-12">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#F4EBDD] font-medium transition-transform duration-300 hover:scale-105 inline-block"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#F4EBDD]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F4EBDD]/40">
            © {new Date().getFullYear()} Renatura. All rights reserved.
          </p>
          <p className="text-xs text-[#F4EBDD]/80">
            Building a compostable future
          </p>
        </div>
      </div>
    </footer>
  );
}
