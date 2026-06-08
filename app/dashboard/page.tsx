import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CircleHelp,
  Clock,
  Eye,
  Home,
  Info,
  LogOut,
  Settings,
  UserRound,
  Video,
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserBookings from "@/app/dashboard/user-bookings";
import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/inloggning");
  }

  const userName = session.user?.name || "Användare";
  const firstLetter = userName.charAt(0).toUpperCase();

  await mongodb();

  const bookings = await Booking.find({
    userEmail: session.user?.email,
  })
    .sort({ createdAt: -1 })
    .lean();

  const meetingAccepted = false;

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
                Hej, {userName}!
              </h1>

              <div className="mt-4 flex items-center gap-3 text-lg text-[#5D6673]">
                <span>19980712-••••</span>
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
          <Home className="mb-8 size-7 text-[#02060A]" />

          <h2 className="text-3xl font-bold">Min fastighet</h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4D5662]">
            Samla bygglov, ritningar, kvitton och försäkringar på ett ställe.
            Sätt påminnelser för OVK och sotning, och få en automatisk
            tidslinje över allt som händer med fastigheten.
          </p>

          <button className="mt-7 inline-flex items-center gap-2 font-semibold text-[#29547B] transition hover:text-[#02060A]">
            Läs mer
            <ArrowRight size={18} />
          </button>
        </div>

        <UserBookings bookings={JSON.parse(JSON.stringify(bookings))} />
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

function MeetingInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-[#02060A]">{icon}</div>

      <div>
        <p className="text-sm text-[#667085]">{label}</p>
        <p className="mt-1 font-bold text-[#17212F]">{value}</p>
      </div>
    </div>
  );
}