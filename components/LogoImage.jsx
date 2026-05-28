"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LogoImage({ className, forceLight, forceDark }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode logo during SSR
  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark";
  
  let src = currentTheme === "light" ? "/logo_name_light.png" : "/logo_name_dark.png";
  if (forceLight) src = "/logo_name_light.png";
  if (forceDark) src = "/logo_name_dark.png";

  return <img src={src} alt="Renatura" className={className} />;
}
