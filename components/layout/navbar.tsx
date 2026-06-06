import Image from "next/image";
import Link from "next/link";
import UserButton from "@/components/ui/user-button";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-[#E5EAF0] bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#17212F]">
          <Image
            src="/images/Bygglov-logo.png"
            alt="Bygglov"
            width={32}
            height={32}
            className="h-10 w-10 object-contain"
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