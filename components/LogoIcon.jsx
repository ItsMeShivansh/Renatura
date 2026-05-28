"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LogoIcon({ className }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode logo during SSR
  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark";
  const src = currentTheme === "light" ? "/logo_light.png" : "/logo_dark.png";

  return (
    <motion.img
      src={src}
      alt="Renatura Logo"
      className={className}
      initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5,
      }}
    />
  );
}
