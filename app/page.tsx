import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/homepage/faq-section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  CirclePlus,
  MessageSquare,
  Mic,
  Search,
  UserRound,
} from "lucide-react";

const advisors = [
  ["Mårten Olsson", "Kontrollansvarig", "Bygg & installation"],
  ["Anders Persson", "Snickare", "Kontroll & besikta"],
  ["Anders Persson", "Snickare", "Planera & rita"],
  ["Olof Persson", "Arkitekt", "Utemiljö & trädgård"],
  ["Emma Karlsson", "Bygglovsexpert", "Bygglov & regler"],
  ["Johan Nilsson", "Konstruktör", "Konstruktion & bärighet"],
];

const SectionLine = ({
  left,
  right,
}: {
  left: string;
  right: string;
}) => {
  return (
    <div className="mb-10 flex items-center gap-8">
      <p className="shrink-0 text-sm text-[#607080]">{left}</p>
      <div className="h-px flex-1 bg-[#9EACB8]" />
      <p className="shrink-0 text-sm text-[#607080]">{right}</p>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#17212F]">
      <Navbar />

      <section className="bg-[#F7F9FB]">
        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="rounded-full bg-[#29547B] px-4 py-2 text-xs font-semibold text-white inline-block mb-1">
              Bygglovsrådgivning – kostnadsfritt
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Bygglovsrådgivning
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#667085]">
              Planerar du att bygga, bygga om eller bygga till? Få kostnadsfri
              bygglovsrådgivning av erfarna experter – snabba svar på regler,
              ritningar och kommunens krav, inom 24 timmar.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 !bg-[#29547B] !text-white hover:!bg-[#214663] hover:!-translate-y-0.5 hover:!shadow-md"
            >
              <Link href="/dashboard">Hitta expert</Link>
            </Button>
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-2xl bg-[#DCE5EC]">
          <Image
            src="/images/Counseling.webp"
            alt="Bygglovsrådgivare"
            fill
            className="object-cover"
            priority
          />
        </div>
        </div>
      </section>

      <section className="py-20 mb-4">
        <div className="mx-auto max-w-7xl px-8">
          <SectionLine left="Så funkar det" right="Ingen tidsbokning, ingen avgift" />

          <h2 className="text-4xl font-bold mt-20">
            Från fundering till bygglov i tre steg
          </h2>

          <p className="mt-4 max-w-xl text-[#667085]">
            Vi gör det enkelt att komma igång. Ingen tidsbokning, ingen avgift –
            bara konkreta svar på dina frågor.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              ["1", "Beskriv ditt projekt", "Fyll i formuläret och berätta kort vad du planerar."],
              ["2", "Vi återkopplar inom 24 h", "En rådgivare läser ditt ärende och hör av sig."],
              ["3", "Kom igång tryggt", "Du vet vilka regler som gäller och nästa steg."],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-xl border border-[#E1E7ED] bg-[#F8FAFC] p-8">
                <div className="mb-8 flex size-10 items-center justify-center rounded-full bg-[#29547B] font-bold text-white">
                  {number}
                </div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-3 text-sm text-[#667085]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-8">
          <SectionLine left="Så funkar det" right="Ingen tidsbokning, ingen avgift" />

          <h2 className="text-4xl font-bold mt-20">AI-driven bokningsupplevelse</h2>

          <p className="mt-4 max-w-xl text-[#667085]">
            Boka rätt expertis – När du är redo kopplas du automatiskt ihop med
            den rådgivare som bäst matchar ditt specifika projekt.
          </p>

          <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[1fr_430px]">
            <div className="flex h-full min-h-[620px] flex-col rounded-xl border border-[#D8E0E8] bg-white p-8">
              <div className="relative flex flex-1 items-center justify-center">
                <div className="absolute size-[390px] rounded-full bg-[#CAD6E0]" />
                <div className="absolute size-[300px] rounded-full bg-[#9FB4C5]/70" />

                <div className="
                    absolute top-10
                    flex size-16 items-center justify-center
                    rounded-full
                    bg-[#173F6B]
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:scale-105
                    hover:bg-[#29547B]
                    hover:shadow-xl
                  ">
                  <Mic size={34} />
                </div>

                <button className="absolute left-4 top-64 flex w-72 items-center gap-4 rounded-lg border-2 border-[#17212F] bg-[#29547B] p-5 text-left text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#214663] hover:shadow-xl">
                  <MessageSquare size={24} />
                  <span>
                    <span className="block font-bold">Beskriv ditt projekt</span>
                    <span className="text-sm text-white inline-block mt-2">
                      Få anpassad rådgivning efter ditt ärende.
                    </span>
                  </span>
                </button>

                <button className="absolute right-4 top-64 flex w-72 items-center gap-4 rounded-lg border-2 border-[#17212F] bg-[#29547B] p-5 text-left text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#214663] hover:shadow-xl">
                  <Search size={24} />
                  <span>
                    <span className="block font-bold">Matcha med rådgivare</span>
                    <span className="text-sm text-white inline-block mt-2">
                      Välj fält och matcha med en expert.
                    </span>
                  </span>
                </button>
              </div>

              <div className="mt-8 flex items-center rounded-full border-2 border-[#17212F] bg-white p-2">
                <input
                  disabled
                  placeholder="Ställ en fråga eller skriv något för att matcha dig med rätt expert..."
                  className="flex-1 bg-transparent px-6 text-sm outline-none"
                />
                <button className="
                        flex size-11 items-center justify-center
                        rounded-full
                        bg-black
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#545f6d]
                      ">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <aside className="flex h-full min-h-[620px] flex-col rounded-xl border border-[#D8E0E8] bg-[#F8FAFC]">
              <div className="flex items-center justify-between rounded-t-xl bg-[#29547B] px-6 py-4 text-white">
                <CirclePlus size={20} />
                <h3 className="text-2xl font-bold">Rådgivare</h3>
                <CirclePlus size={20} />
              </div>

              <div className="max-h-[430px] flex-1 overflow-y-auto p-5 pr-3 scrollbar-thin">
                <div className="space-y-4">
                  {advisors.map(([name, role, area]) => (
                    <div
                      key={`${name}-${area}`}
                      className="flex items-center gap-4 rounded-lg border border-[#C8D2DC] bg-white p-4"
                    >
                      <div className="flex size-11 items-center justify-center rounded-full bg-[#EEF4FA] text-[#29547B]">
                        <UserRound size={22} />
                      </div>

                      <div>
                        <h4 className="font-bold">{name}</h4>
                        <p className="text-sm">{role}</p>
                        <p className="text-sm">{area}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <button className="w-full rounded-xl bg-[#29547B] px-6 py-8 text-center text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-[#214663] hover:shadow-xl">
                  <Calendar className="mx-auto mb-3 size-8" />
                  <span className="block text-lg font-bold">
                    Boka videomöte med rådgivare
                  </span>
                  <span className="mt-2 block text-sm text-white/85">
                    Få svar inom 24 timmar. En rådgivare läser ditt ärende.
                  </span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}