"use client";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export type MatchData = {
  profession: string;
  service: string;
  municipality: string;
  category: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: MatchData) => void;
};

const professions = [
  "Arkitekt",
  "Kontrollansvarig",
  "Snickare",
  "Byggnadsingenjör",
  "Konstruktör",
  "Trädgårdsanläggare",
];

const services = [
  "Renovering fasad & fönster",
  "Mark- och anläggningsarbete",
  "Installation av värmesystem",
  "El & Energi",
  "Byggadministration och dokumentation",
  "Entrepenadbesiktning",
  "Inredningsarkitekt",
];

const municipalities = [
  "Stockholm",
  "Sollentuna",
  "Täby",
  "Nacka",
  "Huddinge",
  "Botkyrka",
];

const categories = [
  "Bygg & Installation",
  "Utemiljö & trädgård",
  "Alla",
  "Kontroll & besikta",
  "Planera & rita",
];

export default function AdvisorMatchModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<MatchData>({
    profession: "",
    service: "",
    municipality: "",
    category: "",
  });

  if (!open) return null;

  const update = (key: keyof MatchData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl md:p-12">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 hover:bg-[#F1F5F9]"
        >
          <X size={22} />
        </button>

        <SelectBlock
          label="Yrken"
          value={form.profession}
          placeholder="Yrken"
          options={professions}
          onChange={(value) => update("profession", value)}
        />

        <SelectBlock
          label="Tjänster"
          value={form.service}
          placeholder="Tjänster"
          options={services}
          onChange={(value) => update("service", value)}
        />

        <SelectBlock
          label="Kommuner"
          value={form.municipality}
          placeholder="Kommuner"
          options={municipalities}
          onChange={(value) => update("municipality", value)}
        />

        <div className="mt-16 mb-16">
          <h3 className="mb-10 text-3xl font-bold">Välj kategori</h3>

          <div className="grid grid-cols-2 gap-x-28 gap-y-8">
            <CategoryButton
              label="Bygg & Installation"
              selected={form.category === "Bygg & Installation"}
              onClick={() => update("category", "Bygg & Installation")}
            />

            <CategoryButton
              label="Utemiljö & trädgård"
              selected={form.category === "Utemiljö & trädgård"}
              onClick={() => update("category", "Utemiljö & trädgård")}
            />

            <div className="col-span-2 flex justify-center">
              <CategoryButton
                label="Alla"
                selected={form.category === "Alla"}
                onClick={() => update("category", "Alla")}
                className="w-36"
              />
            </div>

            <CategoryButton
              label="Kontroll & besikta"
              selected={form.category === "Kontroll & besikta"}
              onClick={() => update("category", "Kontroll & besikta")}
            />

            <CategoryButton
              label="Planera & rita"
              selected={form.category === "Planera & rita"}
              onClick={() => update("category", "Planera & rita")}
            />
          </div>
        </div>

        <button
          onClick={() => onSave(form)}
          className="mt-20 w-full rounded-xl bg-[#29547B] py-5 text-xl font-bold text-white shadow-md transition-all duration-200 hover:bg-[#02060A] hover:shadow-lg"
        >
          Matcha rådgivare
        </button>
      </div>
    </div>
  );
}

function SelectBlock({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-16">
      <h3 className="mb-6 text-3xl font-bold">{label}</h3>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-20 w-full appearance-none rounded-[28px] border border-[#17212F] bg-[#29547B] px-8 text-center text-3xl font-bold text-white outline-none transition hover:bg-[#214663] focus:ring-4 focus:ring-[#29547B]/20"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-white text-black">
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-black" />
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  selected,
  onClick,
  className = "",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-8 py-5 text-2xl font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        selected
          ? "border-[#29547B] bg-[#29547B] text-white"
          : "border-[#17212F] bg-white text-[#17212F] hover:bg-[#F1F6FA]"
      } ${className}`}
    >
      {label}
    </button>
  );
}