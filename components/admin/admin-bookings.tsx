"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  FileText,
  Info,
  Send,
  UserRound,
  Video,
} from "lucide-react";
import { useRouter } from "next/navigation";

type AdminBooking = {
  _id: string;
  userName: string;
  userEmail: string;
  advisorName: string;
  advisorRole: string;
  service: string;
  category: string;
  municipality: string;
  projectDescription?: string;
  status: "pending" | "accepted" | "cancelled";
  acceptedDate?: string;
  acceptedTime?: string;
  meetingUrl?: string;
};

export default function AdminBookings({
  bookings,
}: {
  bookings: AdminBooking[];
}) {
  const router = useRouter();

  if (bookings.length === 0) {
    return (
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">Inkomna bokningar</h2>

        <div className="rounded-xl border border-dashed border-[#C8D2DC] bg-[#F8FAFC] p-10 text-center">
          <CalendarDays className="mx-auto size-12 text-[#29547B]" />
          <h3 className="mt-6 text-2xl font-bold">
            Inga bokningar för tillfället
          </h3>
          <p className="mt-3 text-[#667085]">
            När användare bokar rådgivare visas deras förfrågningar här.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold">Inkomna bokningar</h2>

      <div className="space-y-8">
        {bookings.map((booking) => (
          <AdminBookingCard
            key={booking._id}
            booking={booking}
            onUpdated={() => router.refresh()}
          />
        ))}
      </div>
    </section>
  );
}

function AdminBookingCard({
  booking,
  onUpdated,
}: {
  booking: AdminBooking;
  onUpdated: () => void;
}) {
  const [date, setDate] = useState(booking.acceptedDate || "2026-06-10");
  const [time, setTime] = useState(booking.acceptedTime || "10:00");
  const [meetingUrl, setMeetingUrl] = useState(
    booking.meetingUrl || "https://whereby.com/bygglov-radgivning"
  );
  const [isSaving, setIsSaving] = useState(false);

  const isAccepted = booking.status === "accepted";

  const handleSendConfirmation = async () => {
    try {
      setIsSaving(true);

      const response = await fetch(`/api/bookings/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acceptedDate: date,
          acceptedTime: time,
          meetingType: "Extern möteslänk",
          meetingUrl,
          status: "accepted",
        }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte uppdatera bokningen.");
      }

      onUpdated();
    } catch {
      alert("Kunde inte skicka videomötesbekräftelse.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#D8E0E8] bg-white p-8 shadow-sm">
      <div
        className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
          isAccepted
            ? "bg-[#DDF7E8] text-[#17633A]"
            : "bg-[#FFE29A] text-[#6B4A00]"
        }`}
      >
        <Clock size={16} />
        {isAccepted ? "Bekräftad" : "Inväntar bekräftelse"}
      </div>

      <div className="flex gap-5">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-[#E8F0F7] text-[#29547B]">
          <FileText size={32} />
        </div>

        <div>
          <h3 className="text-2xl font-bold">Bokningsförfrågan</h3>
          <p className="mt-2 text-lg text-[#4D5662]">
            {booking.service} – {booking.category}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-b border-[#E5EAF0] pb-7 md:grid-cols-4">
        <InfoBlock icon={<UserRound size={25} />} label="Användare" value={booking.userName} />
        <InfoBlock icon={<Info size={25} />} label="E-post" value={booking.userEmail} />
        <InfoBlock icon={<UserRound size={25} />} label="Rådgivare" value={booking.advisorName} />
        <InfoBlock icon={<Info size={25} />} label="Kommun" value={booking.municipality} />
      </div>

      {booking.projectDescription && (
        <div className="mt-7 rounded-xl bg-[#F1F5F9] p-5">
          <p className="text-sm font-bold text-[#17212F]">Projektbeskrivning</p>
          <p className="mt-2 text-[#4D5662]">{booking.projectDescription}</p>
        </div>
      )}

      <div className="mt-7 grid gap-5 rounded-xl bg-[#F8FAFC] p-5 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-[#4D5662]">Datum</span>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#D8E0E8] bg-white px-3 outline-none focus:border-[#29547B]"
          >
            <option value="2026-06-10">10 juni 2026</option>
            <option value="2026-06-11">11 juni 2026</option>
            <option value="2026-06-12">12 juni 2026</option>
            <option value="2026-06-15">15 juni 2026</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#4D5662]">Tid</span>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#D8E0E8] bg-white px-3 outline-none focus:border-[#29547B]"
          >
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#4D5662]">
            Extern möteslänk
          </span>
          <input
            value={meetingUrl}
            onChange={(e) => setMeetingUrl(e.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-[#D8E0E8] bg-white px-3 outline-none focus:border-[#29547B]"
            placeholder="https://whereby.com/..."
          />
        </label>
      </div>

      <div className="mt-7">
        <button
          onClick={handleSendConfirmation}
          disabled={isSaving}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#29547B] text-lg font-semibold text-white shadow-sm transition hover:bg-[#02060A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={21} />
          {isSaving
            ? "Skickar bekräftelse..."
            : "Skicka videomötesbekräftelse"}
        </button>

        <p className="mt-3 text-center text-sm text-[#667085]">
          När detta skickas blir användarens videomötesknapp aktiv.
        </p>
      </div>
    </div>
  );
}

function InfoBlock({
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