"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CirclePlus,
  InfoIcon,
  MessageSquare,
  Mic,
  Search,
  UserRound,
} from "lucide-react";
import ProjectFormModal, { ProjectFormData } from "./project-form-modal";
import AdvisorMatchModal, { MatchData } from "./advisor-match-modal";

const advisors = [
  {
    name: "Mårten Olsson",
    role: "Kontrollansvarig",
    areas: ["Bygg & Installation", "Kontroll & besikta"],
    services: ["Kontrollplan", "Bygglov"],
    professions: ["Kontrollansvarig"],
    municipalities: ["Stockholm", "Sollentuna", "Täby"],
  },
  {
    name: "Anders Persson",
    role: "Snickare",
    areas: ["Kontroll & besikta", "Planera & rita"],
    services: ["Besiktning", "Tillbyggnad"],
    professions: ["Snickare"],
    municipalities: ["Stockholm", "Nacka", "Huddinge"],
  },
  {
    name: "Olof Persson",
    role: "Arkitekt",
    areas: ["Planera & rita", "Utemiljö & trädgård"],
    services: ["Bygglovsritning", "Attefallshus", "Nybyggnation"],
    professions: ["Arkitekt"],
    municipalities: ["Sollentuna", "Täby", "Nacka"],
  },
];

export default function BookingExperience() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [matchOpen, setMatchOpen] = useState(false);

  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  const [selectedAdvisorName, setSelectedAdvisorName] = useState<string | null>(
  null
  );
  const [isBooking, setIsBooking] = useState(false);

  const canBook = Boolean((projectData || matchData) && selectedAdvisorName);

  const matchedAdvisors = useMemo(() => {
    if (!matchData) return advisors;

    return advisors.filter((advisor) => {
      const professionMatch =
        !matchData.profession ||
        advisor.professions.includes(matchData.profession);

      const serviceMatch =
        !matchData.service || advisor.services.includes(matchData.service);

      const municipalityMatch =
        !matchData.municipality ||
        advisor.municipalities.includes(matchData.municipality);

      const categoryMatch =
        !matchData.category ||
        matchData.category === "Alla" ||
        advisor.areas.includes(matchData.category);

      return (
        professionMatch &&
        serviceMatch &&
        municipalityMatch &&
        categoryMatch
      );
    });
  }, [matchData]);

  const visibleAdvisors = matchData ? matchedAdvisors : advisors;

  return (
    <>
      <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[1fr_430px]">
        <div className="flex h-full min-h-[620px] flex-col rounded-xl border border-[#D8E0E8] bg-white p-8">
          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute size-[390px] rounded-full bg-[#CAD6E0]" />
            <div className="absolute size-[300px] rounded-full bg-[#9FB4C5]/70" />

            <button className="absolute top-10 flex size-16 items-center justify-center rounded-full bg-[#173F6B] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:!bg-[#02060A] hover:shadow-xl">
              <Mic size={34} />
            </button>

            <button
              onClick={() => setProjectOpen(true)}
              className="absolute left-4 top-40 flex w-72 items-center gap-4 rounded-lg border-2 border-[#17212F] bg-[#29547B] p-5 text-left text-white shadow-md transition-all duration-200 hover:!bg-[#02060A] hover:shadow-xl"
            >
              <MessageSquare size={24} />
              <span>
                <span className="block font-bold">Beskriv ditt projekt</span>
                <span className="mt-2 block text-sm text-white">
                  Få anpassad rådgivning efter ditt ärende.
                </span>
              </span>
            </button>

            <button
              onClick={() => setMatchOpen(true)}
              className="absolute right-4 top-40 flex w-72 items-center gap-4 rounded-lg border-2 border-[#17212F] bg-[#29547B] p-5 text-left text-white shadow-md transition-all duration-200 hover:!bg-[#02060A] hover:shadow-xl"
            >
              <Search size={24} />
              <span>
                <span className="block font-bold">Matcha med rådgivare</span>
                <span className="mt-2 block text-sm text-white">
                  Välj fält och matcha med en expert.
                </span>
              </span>
            </button>
          </div>

          {(projectData || matchData) && (
            <div className="mb-6 rounded-xl border border-[#D8E0E8] bg-[#F8FAFC] p-5 text-sm text-[#17212F]">
              <p className="font-bold text-[#29547B]">AI-assistenten</p>

              {projectData && (
                <p className="mt-2">
                  Du har beskrivit ett projekt i{" "}
                  <strong>{projectData.municipality || "vald kommun"}</strong>.
                </p>
              )}

              {matchData && (
                <p className="mt-2">
                  Du söker{" "}
                  <strong>
                    {matchData.profession || "rådgivare"} inom{" "}
                    {matchData.service || "vald tjänst"}
                  </strong>
                  {matchData.category && <> i kategorin {matchData.category}</>}.
                </p>
              )}

              {matchData && (
                <p className="mt-2">
                  Jag hittade <strong>{visibleAdvisors.length}</strong>{" "}
                  matchande rådgivare.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center rounded-full border-2 border-[#17212F] bg-white p-2 transition-all duration-300 hover:shadow-md">
            <input
              disabled
              placeholder="Ställ en fråga eller skriv något för att matcha dig med rätt expert..."
              className="flex-1 bg-transparent px-6 text-sm outline-none"
            />
            <button className="flex size-11 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:bg-[#374151]">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <aside className="flex h-full min-h-[620px] flex-col rounded-xl border border-[#D8E0E8] bg-[#F8FAFC]">
          <div className="flex items-center justify-between rounded-t-xl bg-[#29547B] px-6 py-4 text-white">
            <CirclePlus size={20} />
            <h3 className="text-2xl font-bold">Rådgivare</h3>
            <InfoIcon size={20} />
          </div>

          <div className="flex-1 overflow-hidden p-5">
            <div className="h-full max-h-[430px] space-y-4 overflow-y-auto pr-2">
              {visibleAdvisors.length > 0 ? (
                visibleAdvisors.map((advisor) => (
                  <button
                  key={advisor.name}
                  onClick={() => setSelectedAdvisorName(advisor.name)}
                  className={`flex w-full items-center gap-4 rounded-lg border bg-white p-4 text-left transition hover:bg-[#F8FAFC] ${
                    selectedAdvisorName === advisor.name
                      ? "border-[#29547B] ring-2 ring-[#29547B]/20"
                      : "border-[#C8D2DC]"
                  }`}
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#EEF4FA] text-[#29547B]">
                    <UserRound size={22} />
                  </div>

                  <div>
                    <h4 className="font-bold">{advisor.name}</h4>
                    <p className="text-sm">{advisor.role}</p>
                    <p className="text-sm">{advisor.areas.join(" • ")}</p>
                  </div>
                </button>
                ))
              ) : (
                <div className="rounded-lg border border-[#C8D2DC] bg-white p-5 text-sm text-[#667085]">
                  Ingen rådgivare matchade exakt. Testa bredare kategori eller
                  välj “Alla”.
                </div>
              )}
            </div>
          </div>

          <div className="p-5">
            <button
              disabled={!canBook || isBooking}
              onClick={async () => {
                const selectedAdvisor = visibleAdvisors.find(
                  (advisor) => advisor.name === selectedAdvisorName
                );

                if (!selectedAdvisor) return;

                try {
                  setIsBooking(true);

                  const response = await fetch("/api/bookings", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      advisorName: selectedAdvisor.name,
                      advisorRole: selectedAdvisor.role,
                      service: matchData?.service || "Bygglovsrådgivning",
                      category: matchData?.category || "Ej angiven",
                      municipality:
                        matchData?.municipality || projectData?.municipality || "Ej angiven",
                      projectDescription: projectData?.description || "",
                    }),
                  });

                  if (!response.ok) {
                    throw new Error("Kunde inte skapa bokning");
                  }

                  window.location.href = "/dashboard";
                } catch (error) {
                  console.error(error);
                  alert("Något gick fel när bokningen skulle skickas.");
                } finally {
                  setIsBooking(false);
                }
              }}
              className="w-full rounded-xl bg-[#29547B] px-6 py-8 text-center text-white shadow-md transition-all duration-200 hover:bg-[#02060A] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#29547B]"
            >
              <Calendar className="mx-auto mb-3 size-8" />

              <span className="block text-lg font-bold">
                {isBooking ? "Skickar bokning..." : "Boka videomöte med rådgivare"}
              </span>

              <span className="mt-2 block text-sm text-white/85">
                Välj rådgivare och skicka bokningsförfrågan.
              </span>
            </button>
          </div>
        </aside>
      </div>

      <ProjectFormModal
        open={projectOpen}
        onClose={() => setProjectOpen(false)}
        onSave={(data) => {
          setProjectData(data);
          setProjectOpen(false);
        }}
      />

      <AdvisorMatchModal
        open={matchOpen}
        onClose={() => setMatchOpen(false)}
        onSave={(data) => {
          setMatchData(data);
          setMatchOpen(false);
        }}
      />
    </>
  );
}