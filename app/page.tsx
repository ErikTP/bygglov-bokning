import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FaqSection from "@/components/homepage/faq-section";
import BookingExperience from "@/components/booking/booking-experience";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <main className="min-h-screen bg-white pt-16 text-[#17212F]">
      <Navbar />

      <section className="bg-[#F7F9FB]">
        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-1 inline-block rounded-full bg-[#29547B] px-4 py-2 text-xs font-semibold text-white">
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
              className="mt-8 !bg-[#29547B] !text-white hover:!bg-[#02060A] hover:!shadow-md"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                Hitta expert
                <ArrowRight size={18} />
              </Link>
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

      <section className="mb-4 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <SectionLine
            left="SÅ FUNKAR DET"
            right="INGEN TIDSBOKNING, INGEN AVGIFT"
          />

          <h2 className="mt-20 text-4xl font-bold">
            Från fundering till bygglov i tre steg
          </h2>

          <p className="mt-4 max-w-xl text-[#667085]">
            Vi gör det enkelt att komma igång. Ingen tidsbokning, ingen avgift –
            bara konkreta svar på dina frågor.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [
                "1",
                "Beskriv ditt projekt",
                "Fyll i formuläret och berätta kort vad du planerar.",
              ],
              [
                "2",
                "Vi återkopplar inom 24 h",
                "En rådgivare läser ditt ärende och hör av sig.",
              ],
              [
                "3",
                "Kom igång tryggt",
                "Du vet vilka regler som gäller och nästa steg.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-xl border border-[#E1E7ED] bg-[#F8FAFC] p-8"
              >
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
          <SectionLine
            left="BOKNINGSSYSTEM"
            right="AI-ASSISTENT, FÖR RÄTT EXPERTIS"
          />

          <h2 className="mt-20 text-4xl font-bold">
            AI-driven bokningsupplevelse
          </h2>

          <p className="mt-4 max-w-xl text-[#667085]">
            Boka rätt expertis med AI-stöd – Låt vår AI analysera ditt ärende och föreslå den rådgivare som matchar din profil perfekt. Välj själv eller låt oss guida dig – boka sedan ditt möte med ett enda klick
          </p>

          <BookingExperience />
        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}