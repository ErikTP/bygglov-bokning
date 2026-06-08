"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import UserButton from "@/components/ui/user-button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white/95 backdrop-blur transition-all duration-200 ${
        scrolled
          ? "border-b border-[#D8E0E8] shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[#17212F]"
        >
          <Image
            src="/images/Bygglov-logo.png"
            alt="Bygglov"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <span className="text-xl md:text-2xl">Bygglov.se</span>
        </Link>

        <nav className="hidden items-center gap-10 text-base font-medium text-[#4b4c4e] lg:flex">
          <Link href="/" className="transition-colors duration-200 hover:text-[#02060A]">Hitta expert</Link>
          <Link href="/" className="transition-colors duration-200 hover:text-[#02060A]">Rådgivning</Link>
          <Link href="/" className="transition-colors duration-200 hover:text-[#02060A]">Kontrollplan</Link>
          <Link href="/" className="transition-colors duration-200 hover:text-[#02060A]">Biblioteket</Link>
          <Link href="/" className="transition-colors duration-200 hover:text-[#02060A]">Din kommun</Link>
        </nav>

        <div className="hidden lg:block">
          <UserButton />
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-lg border border-[#D8E0E8] bg-white text-[#17212F] lg:hidden"
        >
          <Menu size={22} />
        </button>

        {mobileOpen && (
          <div className="absolute right-4 top-[58px] z-50 w-[230px] rounded-xl border border-[#E5EAF0] bg-white p-3 shadow-xl lg:hidden">
            <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-[#607080]">
              Meny
            </p>

            <nav className="flex flex-col gap-0.5 text-sm font-medium text-[#17212F]">
              {[
                "Hitta expert",
                "Rådgivning",
                "Kontrollplan",
                "Biblioteket",
                "Din kommun",
              ].map((item) => (
                <Link
                  key={item}
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 transition hover:bg-[#F3F6F9]"
                >
                  <span>{item}</span>
                  <ChevronRight size={15} className="text-[#8A98A8]" />
                </Link>
              ))}
            </nav>

            <div className="my-2 h-px bg-[#E5EAF0]" />

            <Link
              href="/inloggning"
              onClick={() => setMobileOpen(false)}
              className="mb-2 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#D8E0E8] bg-white px-2 text-xs font-semibold text-[#17212F] transition hover:!bg-[#e6f2fd] hover:shadow-sm"
            >
              <Image
                src="/images/Bank-ID.png"
                alt="BankID"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
              Logga in
            </Link>

            <Link
              href="/registrering"
              onClick={() => setMobileOpen(false)}
              className="flex h-8 w-full items-center justify-center rounded-md !bg-[#29547B] px-2 text-xs font-semibold text-white shadow-sm transition hover:!bg-[#02060A] hover:shadow-md"
            >
              Anslut dig
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;