"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import NavDesktop from "./navbar/NavDekstop";
import NavMobile from "./navbar/NavMobile";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]); 
  const shouldShowSolidNavbar = !isHomePage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        shouldShowSolidNavbar
          ? "h-16 md:h-20 bg-white shadow-md text-slate-900 border-b border-slate-100"
          : "h-16 md:h-20 bg-transparent text-white"
      }`}
    >
      <NavDesktop 
        isScrolled={shouldShowSolidNavbar}
        isLoggedIn={!!token} 
        user={user}
        logout={clearAuth}
        router={router}
      />

      <NavMobile 
        isScrolled={shouldShowSolidNavbar}
        isLoggedIn={!!token} 
        user={user}
        logout={clearAuth}
        router={router}
      />
    </nav>
  );
}