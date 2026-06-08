"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  Warehouse,
  FileText,
  Compass,
  Gavel,
  Plus,
  Minus,
} from "lucide-react";

const topics = [
  {
    icon: Home,
    title: "Bygglov för nybyggnation",
    description:
      "Bygga hus, garage eller fritidshus från grunden. Vi reder ut vad som krävs.",
  },
  {
    icon: Building2,
    title: "Tillbyggnad & ombyggnad",
    description:
      "Utöka boytan, bygga inglasad altan eller ändra fasaden – vi guidar dig rätt.",
  },
  {
    icon: Warehouse,
    title: "Attefallshus & friggebod",
    description:
      "Bygglovsbefriade åtgärder kräver ofta anmälan. Vi förklarar gränserna.",
  },
  {
    icon: FileText,
    title: "Anmälan utan bygglov",
    description:
      "Eldstad, ventilation eller bärande väggar – vi vet vad kommunen vill se.",
  },
  {
    icon: Compass,
    title: "Ritningar & kontrollplan",
    description:
      "Får du nej på ofullständigt underlag? Vi förklarar vad som måste med.",
  },
  {
    icon: Gavel,
    title: "Avslag & överklagan",
    description:
      "Fick du avslag? Vi går igenom beslutet och dina möjligheter att överklaga.",
  },
];

const questions = [
  {
    question: "Är rådgivningen verkligen kostnadsfri?",
    answer:
      "Ja. Den initiala rådgivningen är gratis och utan förpliktelser.",
  },
  {
    question: "Hur snabbt får jag svar?",
    answer:
      "Vi återkommer normalt inom 1 timme på vardagar, senast inom 24 timmar. Skickar du in ditt ärende under en helg svarar vi senast på måndagen.",
  },
  {
    question: "Vad ska jag bifoga i mitt meddelande?",
    answer:
      "Skriv kort vad du vill bygga, var fastigheten ligger och om du har ritningar eller skisser. Mer information ger snabbare och mer träffsäker rådgivning.",
  },
  {
    question: "Vilka typer av projekt kan ni hjälpa till med?",
    answer:
      "Vi hjälper privatpersoner och företag med allt från attefallshus och tillbyggnader till nybyggnation, anmälningsärenden och överklagan av kommunens beslut.",
  },
  {
    question: "Behöver jag anlita er efter rådgivningen?",
    answer:
      "Nej. Rådgivningen är fristående. Vill du gå vidare kan vi matcha dig med en expert i din kommun – men valet är alltid ditt.",
  },
  {
    question: "Vem är det jag pratar med?",
    answer:
      "Våra rådgivare har erfarenhet av bygglovsprocessen, ritningar och kommunal handläggning. De flesta är arkitekter, byggnadsingenjörer eller kontrollansvariga.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 -mt-20">
      <div className="mx-auto max-w-7xl px-8">

        {/* Top line */}
        <div className="mb-10 flex items-center gap-8">
          <p className="shrink-0 text-sm text-[#607080]">
            FAQ
          </p>

          <div className="h-px flex-1 bg-[#D8E0E8]" />

          <p className="shrink-0 text-sm text-[#607080]">
            VANLIGA FRÅGOR OM BYGGLOV & RÅDGIVNING
          </p>
        </div>

        {/* Heading */}
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] mt-20">

          <div>
            <h2 className="text-4xl font-bold tracking-tight text-[#17212F]">
              Vanliga frågor om bygglov & vår rådgivning
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#667085]">
              Hitta snabbt svar kring bygglov, ritningar,
              anmälan och hur vår rådgivning hjälper dig vidare.
            </p>
          </div>

          {/* Topic cards */}
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#D8E0E8] bg-[#D8E0E8] md:grid-cols-2">

            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <div
                  key={topic.title}
                  className="bg-white p-6 transition hover:bg-[#F8FAFC]"
                >
                  <Icon
                    size={22}
                    className="mb-4 text-[#29547B]"
                  />

                  <h3 className="font-bold text-[#17212F] text-lg">
                    {topic.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#667085]">
                    {topic.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-[#D8E0E8]">

          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-b border-[#D8E0E8] last:border-b-0"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#17212F]">
                    {item.question}
                  </span>

                  <span className="flex size-8 items-center justify-center rounded-full border border-[#B6C1CC] text-[#29547B] hover:!bg-[#02060A] hover:text-white">
                    {isOpen ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-[#667085]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}