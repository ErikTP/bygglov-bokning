"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";

export type ProjectFormData = {
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  phone: string;
  municipality: string;
  description: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
};

export default function ProjectFormModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<ProjectFormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    municipality: "",
    description: "",
  });

  if (!open) return null;

  const update = (key: keyof ProjectFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 hover:bg-[#F1F5F9]"
        >
          <X size={22} />
        </button>

        <h2 className="max-w-2xl text-4xl font-bold leading-tight">
          Fyll i formuläret så hör vi av oss med rådgivning anpassad efter ditt
          ärende.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Input placeholder="Förnamn" value={form.firstName} onChange={(v) => update("firstName", v)} />
          <Input placeholder="Efternamn" value={form.lastName} onChange={(v) => update("lastName", v)} />

          <Input className="md:col-span-2" placeholder="Adress inkl. postnr & ort (valfritt)" value={form.address || ""} onChange={(v) => update("address", v)} />

          <Input placeholder="din.epost@exempel.se" value={form.email} onChange={(v) => update("email", v)} />
          <Input placeholder="070-123 45 67" value={form.phone} onChange={(v) => update("phone", v)} />

          <Input className="md:col-span-2" placeholder="Sök eller välj kommun" value={form.municipality} onChange={(v) => update("municipality", v)} />

          <textarea
            placeholder="Beskriv ditt projekt..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="min-h-44 rounded-lg border border-[#D8E0E8] px-5 py-4 text-lg outline-none transition focus:border-[#29547B] focus:ring-2 focus:ring-[#29547B]/20 md:col-span-2"
          />

          <label className="flex min-h-36 cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#C8D2DC] bg-[#FAFAFA] text-lg text-[#667085] transition hover:border-[#29547B] hover:bg-[#F8FAFC] md:col-span-2">
            <input type="file" multiple className="hidden" />
            <span className="flex items-center gap-3">
              <Upload size={24} />
              Bifoga upp till 5 filer (max 1 MB per fil)
            </span>
          </label>
        </div>

        <button
          onClick={() => onSave(form)}
          className="mt-8 w-full rounded-lg bg-[#151515] py-5 text-xl font-semibold text-white transition hover:bg-[#2A2A2A]"
        >
          Skicka
        </button>

        <p className="mt-8 text-center text-lg text-[#667085]">
          Genom att skicka godkänner du våra{" "}
          <span className="underline">användarvillkor</span>.
        </p>
      </div>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  className = "",
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border border-[#D8E0E8] px-5 py-4 text-lg outline-none transition focus:border-[#29547B] focus:ring-2 focus:ring-[#29547B]/20 ${className}`}
    />
  );
}