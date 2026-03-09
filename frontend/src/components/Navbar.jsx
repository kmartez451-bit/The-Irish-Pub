import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio",    href: "#inicio" },
  { label: "Eventos",   href: "#eventos" },
  { label: "Reservar",  href: "#reserva" },
  { label: "Marcas",    href: "#marcas" },
  { label: "Ubicación", href: "#ubicacion" },
];

function LogoImg({ height }) {
  return (
    <img
      src="/Logo-Photoroom.png"
      alt="The Irish Pub RD"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "shadow-lg shadow-black/70" : ""
        }`}
        style={{
          background: scrolled ? "#1C1E21" : "rgba(28,30,33,0.92)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">

          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNav("#inicio"); }}
            className="flex items-center"
          >
            <LogoImg height="64px" />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className="link-lift font-sans font-medium"
                  style={{ color: "#BEC3C9", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#BEC3C9"; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#reserva"
            onClick={(e) => { e.preventDefault(); handleNav("#reserva"); }}
            className="hidden md:flex btn-magnetic items-center gap-2 font-sans font-bold rounded-full px-6 py-3"
            style={{ background: "#31A73B", color: "#fff", fontSize: "0.9rem" }}
          >
            <span className="btn-slide" style={{ background: "#00A400" }} />
            <span>Reservar Mesa</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            style={{ color: "#F5F6F7" }}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${open ? "open" : ""}`}
        style={{ background: "#1C1E21" }}
      >
        <button
          className="absolute top-6 right-6"
          style={{ color: "#F5F6F7" }}
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          <X size={32} />
        </button>

        <div className="mb-4">
          <LogoImg height="80px" />
        </div>

        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className="link-lift font-sans font-semibold bg-transparent"
            style={{ fontSize: "1.5rem", color: "#F5F6F7" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F6F7"; }}
          >
            {link.label}
          </button>
        ))}

        <button
          onClick={() => handleNav("#reserva")}
          className="btn-magnetic mt-4 font-sans font-bold rounded-full px-9 py-4"
          style={{ background: "#31A73B", color: "#fff", fontSize: "1rem" }}
        >
          <span className="btn-slide" style={{ background: "#00A400" }} />
          <span>Reservar Mesa</span>
        </button>
      </div>
    </>
  );
}
