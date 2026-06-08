import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  CircleHelp,
  Eye,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AdminBookings from "@/components/admin/admin-bookings";
import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/inloggning");
  }

  await mongodb();

  const bookings = await Booking.find({})
    .sort({ createdAt: -1 })
    .lean();

  const adminName = session.user?.name || "Admin";
  const firstLetter = adminName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-white pt-16 text-[#17212F]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#29547B] text-3xl font-semibold text-white">
              {firstLetter}
            </div>

            <div>
              <h1 className="text-4xl font-medium tracking-tight">
                Adminpanel
              </h1>

              <div className="mt-4 flex items-center gap-3 text-lg text-[#5D6673]">
                <span>{adminName}</span>
                <Eye size={18} />
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <IconButton icon={<CircleHelp size={21} />} />
            <IconButton icon={<Settings size={21} />} />
            <IconButton icon={<LogOut size={21} />} />
          </div>
        </div>

        <div className="rounded-xl border border-[#D8E0E8] bg-gradient-to-r from-white to-[#F3F7FA] p-10">
          <ShieldCheck className="mb-8 size-7 text-[#02060A]" />

          <h2 className="text-3xl font-bold">Bokningshantering</h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4D5662]">
            Här kan du granska inkomna bokningsförfrågningar, välja datum och
            tid samt skicka en extern videomöteslänk till användaren.
          </p>
        </div>

        <AdminBookings bookings={JSON.parse(JSON.stringify(bookings))} />
      </section>

      <Footer />
    </main>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex size-14 items-center justify-center rounded-full bg-[#F5F6F8] text-[#02060A] transition hover:bg-[#E8EEF4]">
      {icon}
    </button>
  );
}