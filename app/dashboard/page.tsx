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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/inloggning");
  }

  const userName = session.user?.name || "Användare";
  const firstLetter = userName.charAt(0).toUpperCase();

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
                <span>19931018-••••</span>
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

        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">Mina bokade möten</h2>

          <div className="rounded-xl border border-[#D8E0E8] bg-white p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FFE29A] px-4 py-2 text-sm font-semibold text-[#6B4A00]">
              <Clock size={16} />
              Redovisas ännu
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-5">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#29547B]">
                  <CalendarDays size={32} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Videomöte med rådgivare
                  </h3>
                  <p className="mt-2 text-lg text-[#4D5662]">
                    Kontrollansvarig – Bygglov
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-b border-[#E5EAF0] pb-7 md:grid-cols-4">
              <MeetingInfo
                icon={<CalendarDays size={25} />}
                label="Datum"
                value="29 maj 2025"
              />

              <MeetingInfo
                icon={<Clock size={27} />}
                label="Tid"
                value="14:00"
              />

              <MeetingInfo
                icon={<UserRound size={27} />}
                label="Rådgivare"
                value="Mårten Olsson"
              />

              <MeetingInfo
                icon={<Video size={27} />}
                label="Mötestyp"
                value="Videomöte"
              />
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-[1fr_360px] md:items-center">
              <div className="flex items-start gap-4 rounded-xl bg-[#F1F5F9] p-5 text-[#4D5662]">
                <Info className="mt-1 size-6 text-[#29547B]" />
                <p className="text-base leading-7">
                  Din rådgivare har ännu inte godkänt mötestiden.
                  <br />
                  När mötet är accepterat blir knappen aktiv.
                </p>
              </div>

              <div className="text-center">
                <button
                  disabled={!meetingAccepted}
                  className={`flex h-14 w-full items-center justify-center gap-3 rounded-xl text-lg font-semibold transition ${
                    meetingAccepted
                      ? "bg-[#29547B] text-white hover:bg-[#02060A]"
                      : "cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]"
                  }`}
                >
                  <Video size={22} />
                  Starta videomöte
                </button>

                <p className="mt-3 text-sm text-[#667085]">
                  Tillgänglig 15 min före mötet
                </p>
              </div>
            </div>
          </div>
        </section>
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