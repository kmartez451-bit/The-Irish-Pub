import { Instagram, Facebook, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio",    href: "#inicio" },
  { label: "Eventos",   href: "#eventos" },
  { label: "Reservar",  href: "#reserva" },
  { label: "Marcas",    href: "#marcas" },
  { label: "Ubicación", href: "#ubicacion" },
];

const SOCIAL = [
  { icon: Instagram,     href: "https://www.instagram.com/theirishpubrd/", label: "Instagram" },
  { icon: Facebook,      href: "https://www.facebook.com/theirishpubrd",   label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/18295238025",                label: "WhatsApp" },
];

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="rounded-t-[4rem] px-6 pt-16 pb-8"
      style={{ background: "#303338" }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12"
          style={{ borderBottom: "1px solid #444950" }}>

          {/* Brand */}
          <div>
            <div className="mb-5" style={{ lineHeight: 0 }}>
              <div
                style={{
                  display: "inline-block",
                  lineHeight: 0,
                  background: "#000000",
                  mixBlendMode: "screen",
                }}
              >
                <img
                  src="/Logo.png"
                  alt="The Irish Pub RD"
                  style={{ height: "64px", width: "auto", display: "block" }}
                />
              </div>
            </div>
            <p className="font-serif italic leading-relaxed max-w-xs mb-6"
              style={{ fontSize: "1rem", color: "#8D949E" }}>
              Beers, Food, Cocktails &amp; Rock N&apos; Roll — en el corazón de Santo Domingo.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ background: "#444950", color: "#8D949E" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#31A73B"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#444950"; e.currentTarget.style.color = "#8D949E"; }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono uppercase tracking-widest mb-5"
              style={{ fontSize: "0.65rem", color: "#31A73B" }}>Navegación</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button onClick={() => handleNav(link.href)}
                    className="link-lift font-sans bg-transparent"
                    style={{ fontSize: "0.95rem", color: "#8D949E" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F5F6F7"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#8D949E"; }}
                  >{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono uppercase tracking-widest mb-5"
              style={{ fontSize: "0.65rem", color: "#31A73B" }}>Contacto</p>
            <div className="space-y-3 font-sans" style={{ fontSize: "0.9rem", color: "#8D949E" }}>
              <p>C Manuel de Jesús Troncoso</p>
              <p>Santo Domingo 10127, RD</p>
              <a href="tel:+18295238025"
                onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#8D949E"; }}
                className="block transition-colors">
                +1 829-523-8025
              </a>
              <a href="https://www.instagram.com/theirishpubrd/" target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#8D949E"; }}
                className="block transition-colors">
                @theirishpubrd
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono uppercase tracking-widest" style={{ fontSize: "0.65rem", color: "#606770" }}>
            © {new Date().getFullYear()} The Irish Pub RD · Santo Domingo, República Dominicana
          </p>
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="font-mono uppercase tracking-widest" style={{ fontSize: "0.65rem", color: "#606770" }}>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
