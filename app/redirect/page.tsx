import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function RedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/inloggning");
  }

  if ((session.user as any).role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}