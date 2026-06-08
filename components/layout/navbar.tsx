"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserButton from "@/components/ui/user-button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 h-16 w-full bg-white/95 backdrop-blur transition-all duration-200 ${
        scrolled
          ? "border-b border-[#D8E0E8]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#17212F]">
          <Image
            src="/images/Bygglov-logo.png"
            alt="Bygglov"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <span className="text-2xl">Bygglov.se</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-[#17212F] md:flex">
          <Link href="/">Hitta expert</Link>
          <Link href="/">Rådgivning</Link>
          <Link href="/">Kontrollplan</Link>
          <Link href="/">Biblioteket</Link>
          <Link href="/">Din kommun</Link>
        </nav>

        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;