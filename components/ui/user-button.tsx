"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = ({ mobile = false }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 animate-spin text-[#29547B]" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase() || "U";

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  if (session) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className={
            mobile
              ? "w-full rounded-lg px-3 py-2 text-left outline-none transition hover:bg-[#F3F6F9]"
              : "outline-none"
          }
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#17212F]">
              {session.user?.name}
            </span>

            <Avatar className="size-10">
              <AvatarImage src={session.user?.image || undefined} />
              <AvatarFallback className="bg-[#29547B] text-white">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="bottom" className="w-48">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Logga ut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

if (mobile) {
  return (
    <div className="flex flex-col gap-1.5">
      <Link
        href="/inloggning"
        className="flex h-8 items-center justify-center gap-2 rounded-md border border-[#D8E0E8] bg-white px-2 text-xs font-semibold text-[#17212F] transition hover:bg-[#F8FAFC]"
      >
        <Image
          src="/images/Bank-ID.png"
          alt="BankID"
          width={18}
          height={18}
          className="h-4 w-4 object-contain"
        />
        Logga in
      </Link>

      <Link
        href="/registrering"
        className="flex h-8 items-center justify-center rounded-md bg-[#29547B] px-2 text-xs font-semibold text-white transition hover:bg-[#214663]"
      >
        Anslut dig
      </Link>
    </div>
  );
}

  return (
    <div className="flex items-center gap-3">
      <Button
        asChild
        size="lg"
        className="!border !border-[#D8E0E8] !bg-white !text-[#17212F]  hover:!bg-[#e6f2fd] hover:!shadow-md"
      >
        <Link href="/inloggning" className="flex items-center gap-2">
          <Image
            src="/images/Bank-ID.png"
            alt="BankID"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          Logga in
        </Link>
      </Button>

      <Button
        asChild
        size="lg"
        className="!bg-[#29547B] !text-white hover:!bg-[#02060A]"
      >
        <Link href="/registrering">Anslut dig</Link>
      </Button>
    </div>
  );
};

export default UserButton;