import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Renatura — Return to Nature",
  description:
    "Renatura is a leading manufacturer and exporter of compostable products — from W-cut and D-cut bags to tableware and food packaging. Certified, sustainable, and ready for global B2B partnerships.",
  keywords: [
    "compostable bags",
    "biodegradable products",
    "W-cut bags",
    "D-cut bags",
    "compostable tableware",
    "B2B export",
    "sustainable packaging",
    "Renatura",
  ],
  icons: {
    icon: [
      { url: "/logo_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
