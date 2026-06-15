"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import NavDesktop from "./navbar/NavDekstop";
import NavMobile from "./navbar/NavMobile";

export default function Navbar() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "h-16 md:h-20 bg-white shadow-md text-slate-900 border-b border-slate-100"
          : "h-16 md:h-20 bg-transparent text-white"
      }`}
    >
      <NavDesktop 
        isScrolled={isScrolled}
        isLoggedIn={!!token} 
        user={user}
        logout={clearAuth}
        router={router}
      />

      <NavMobile 
        isScrolled={isScrolled}
        isLoggedIn={!!token} 
        user={user}
        logout={clearAuth}
        router={router}
      />
    </nav>
  );
}