"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  FileText,
  Info,
  UserRound,
  Video,
  XCircle,
} from "lucide-react";

type BookingStatus = "pending" | "accepted" | "cancelled";

type UserBooking = {
  _id: string;
  advisorName: string;
  advisorRole: string;
  service: string;
  category: string;
  municipality: string;
  status: BookingStatus;
  acceptedDate?: string;
  acceptedTime?: string;
  meetingType?: string;
  meetingUrl?: string;
};

export default function UserBookings({
  bookings,
}: {
  bookings: UserBooking[];
}) {
  const router = useRouter();

  if (bookings.length === 0) {
    return (
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">Mina bokade möten</h2>

        <div className="rounded-xl border border-dashed border-[#C8D2DC] bg-[#F8FAFC] p-10 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#E8F0F7] text-[#29547B]">
            <CalendarDays size={30} />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            Inga bokade möten för tillfället
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-[#667085]">
            När du skickar en bokningsförfrågan via rådgivningssidan visas den
            här.
          </p>
        </div>
      </section>
    );
  }

  const booking = bookings[0];
  const isAccepted = booking.status === "accepted";

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${booking._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunde inte avbryta bokningen.");
      }

      router.refresh();
    } catch {
      alert("Kunde inte avbryta bokningen.");
    }
  };

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold">Mina bokade möten</h2>

      <div className="rounded-xl border border-[#D8E0E8] bg-white p-8 shadow-sm">
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
            isAccepted
              ? "bg-[#DDF7E8] text-[#17633A]"
              : "bg-[#FFE29A] text-[#6B4A00]"
          }`}
        >
          <Clock size={16} />
          {isAccepted ? "Möte accepterat" : "Väntar på granskning"}
        </div>

        <div className="flex gap-5">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#29547B]">
            {isAccepted ? <CalendarDays size={32} /> : <FileText size={32} />}
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              {isAccepted ? "Videomöte med rådgivare" : "Bokningsförfrågan"}
            </h3>

            <p className="mt-2 text-lg text-[#4D5662]">
              {booking.service} – {booking.category}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-b border-[#E5EAF0] pb-7 md:grid-cols-4">
          <MeetingInfo
            icon={<FileText size={25} />}
            label="Ärende"
            value={booking.category}
          />

          <MeetingInfo
            icon={<CalendarDays size={25} />}
            label="Status"
            value={isAccepted ? "Tid bokad" : "Inväntar rådgivare"}
          />

          <MeetingInfo
            icon={<UserRound size={27} />}
            label="Rådgivare"
            value={booking.advisorName}
          />

          <MeetingInfo
            icon={<Info size={25} />}
            label="Kommun"
            value={booking.municipality}
          />
        </div>

        {isAccepted ? (
          <AcceptedMeeting booking={booking} />
        ) : (
          <PendingBooking onCancel={handleCancelBooking} />
        )}
      </div>
    </section>
  );
}

function PendingBooking({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="mt-7 grid gap-6 md:grid-cols-[1fr_280px] md:items-center">
      <div className="flex items-start gap-4 rounded-xl bg-[#F1F5F9] p-5 text-[#4D5662]">
        <Info className="mt-1 size-6 text-[#29547B]" />
        <p className="text-base leading-7">
          Din bokningsförfrågan har skickats och inväntar rådgivarens
          granskning. När rådgivaren accepterar ärendet visas mötestid och länk
          här.
        </p>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D8E0E8] bg-white text-sm font-semibold text-[#17212F] transition hover:bg-[#F3F4F6]"
      >
        <XCircle size={19} />
        Avbryt bokning
      </button>
    </div>
  );
}

function AcceptedMeeting({ booking }: { booking: UserBooking }) {
  const hasMeetingUrl = Boolean(booking.meetingUrl);

  return (
    <div className="mt-7 grid gap-6 md:grid-cols-[1fr_360px] md:items-center">
      <div className="grid gap-4 rounded-xl bg-[#F1F5F9] p-5 text-[#4D5662] md:grid-cols-2">
        <MeetingInfo
          icon={<CalendarDays size={24} />}
          label="Datum"
          value={booking.acceptedDate || "Ej angivet"}
        />

        <MeetingInfo
          icon={<Clock size={24} />}
          label="Tid"
          value={booking.acceptedTime || "Ej angivet"}
        />

        <MeetingInfo
          icon={<Video size={24} />}
          label="Mötestyp"
          value={booking.meetingType || "Extern möteslänk"}
        />

        <MeetingInfo
          icon={<UserRound size={24} />}
          label="Rådgivare"
          value={booking.advisorName}
        />
      </div>

      <div className="text-center">
        <a
          href={hasMeetingUrl ? booking.meetingUrl : undefined}
          className={`flex h-14 w-full items-center justify-center gap-3 rounded-xl text-lg font-semibold transition ${
            hasMeetingUrl
              ? "bg-[#29547B] text-white hover:bg-[#02060A]"
              : "pointer-events-none cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]"
          }`}
        >
          <Video size={22} />
          Starta videomöte
        </a>

        <p className="mt-3 text-sm text-[#667085]">
          Knappen blir aktiv när rådgivaren har lagt till möteslänken.
        </p>
      </div>
    </div>
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