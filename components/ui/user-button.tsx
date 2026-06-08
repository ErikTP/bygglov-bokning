"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
            <div className="flex gap-4 items-center">
              <span>{session.user?.name}</span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={()=>handleSignOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
      <div className="flex justify-end gap-3">
        <Button
          asChild
          size="lg"
          className="!border !border-[#D8E0E8] !bg-white !text-[#17212F] hover:!-translate-y-0.5 hover:!bg-[#F8FAFC] hover:!shadow-md"
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
          className="!bg-[#29547B] !text-white hover:!-translate-y-0.5 hover:!bg-[#214663] hover:!shadow-md"
        >
          <Link href="/registrering">Anslut dig</Link>
        </Button>
      </div>
      )}
    </nav>
  );
};

export default UserButton;