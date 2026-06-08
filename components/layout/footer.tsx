import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#02060A] text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        {/* Top */}
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.6fr_0.8fr]">

          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/Bygglov-logo.png"
                alt="Bygglov"
                width={44}
                height={44}
                className="h-11 w-11 object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)]"
              />

              <span className="text-3xl font-bold">
                Bygglov
              </span>
            </div>

            <p className="mt-8 max-w-3xl text-1xl leading-relaxed text-white/90">
              Vi hjälper dig genom hela bygglovsprocessen — från idé till
              färdigt projekt. Verifierade experter, regler från Sveriges
              290 kommuner och praktiska verktyg på ett ställe.
            </p>
          </div>

          <div className="border-l border-white/10 pl-12">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-white/80">
              Följ oss
            </h3>

            <div className="flex gap-4">
              <SocialButton>
                <FaLinkedinIn size={18} />
              </SocialButton>

              <SocialButton>
                <FaInstagram size={18} />
              </SocialButton>

              <SocialButton>
                <FaFacebookF size={18} />
              </SocialButton>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-12 border-b border-white/10 py-12 md:grid-cols-3">

          <FooterColumn
            title="TJÄNSTER"
            links={[
              "Hitta expert",
              "Rådgivning",
              "Bygglovshandlingar",
              "Skapa kontrollplan",
            ]}
          />

          <FooterColumn
            title="RESURSER"
            links={[
              "Biblioteket",
              "Din kommun",
              "Bygglovsrapporten",
              "Artiklar",
            ]}
          />

          <FooterColumn
            title="INFORMATION"
            links={[
              "Om oss",
              "Anslut dig",
              "Allmänna villkor",
              "Kontakta oss",
              "Pressmeddelanden",
              "Nyhetsbrev",
            ]}
          />

        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 BYGGLOV.SE 290 AB
          </p>

          <div className="flex gap-8">
            <Link href="/">
              INTEGRITETSPOLICY
            </Link>

            <Link href="/">
              KAKOR
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

const SocialButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <button
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/15
        text-white
        transition
        hover:border-white/40
        hover:bg-white/5
      "
    >
      {children}
    </button>
  );
};

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold tracking-wide text-white/70">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="/"
              className="
                text-base
                text-white/90
                transition
                hover:text-white
              "
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;