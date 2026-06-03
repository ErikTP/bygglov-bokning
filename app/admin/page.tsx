import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserButton from "@/components/ui/user-button";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/inloggning");
  }

  if ((session.user as any).role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div>
      <UserButton />
      <h1>Adminpanel</h1>
    </div>
  );
}