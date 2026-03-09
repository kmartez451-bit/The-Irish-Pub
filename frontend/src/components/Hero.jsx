import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
  "https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=800&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
  "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80",
];

export default function Hero({ posts = [] }) {
  const contentRef = useRef(null);

  const gridPhotos = (() => {
    const imagePosts = posts.filter((p) => p.type === "image").slice(0, 6);
    if (imagePosts.length >= 6) return imagePosts.map((p) => p.media);
    return [...imagePosts.map((p) => p.media), ...FALLBACK_IMAGES.slice(0, 6 - imagePosts.length)];
  })();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(contentRef.current.children),
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.14, delay: 0.35 }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" className="relative w-full h-[100dvh] overflow-hidden">

      {/* ── Background photo grid ── */}
      <div className="hero-grid">
        {gridPhotos.map((src, i) => (
          <div key={i} className="hero-grid-cell">
            <img
              src={src}
              alt={`The Irish Pub RD — foto ${i + 1}`}
              loading={i < 2 ? "eager" : "lazy"}
              onError={(e) => { e.target.src = FALLBACK_IMAGES[0]; }}
            />
          </div>
        ))}
      </div>

      {/* ── Layer 1: overall dark gradient (top + bottom) ── */}
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to top, #1C1E21 0%, rgba(28,30,33,0.82) 40%, rgba(28,30,33,0.30) 100%)" }}
      />
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(28,30,33,0.55) 0%, transparent 30%)" }}
      />

      {/* ── Layer 2: radial vignette centered — guarantees pure dark behind the logo
               so mix-blend-mode:screen removes the black PNG background cleanly ── */}
      <div
        className="absolute z-10"
        style={{
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 35%, transparent 70%)",
        }}
      />

      {/* ── Layer 3: subtle green tint from left ── */}
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(120deg, rgba(0,164,0,0.12) 0%, transparent 50%)" }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Logo — transparent PNG, rendered directly */}
        <div className="opacity-0" style={{ lineHeight: 0 }}>
          <img
            src="/Logo-Photoroom.png"
            alt="The Irish Pub RD"
            style={{
              width: "clamp(260px, 46vw, 560px)",
              display: "block",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="opacity-0 font-serif italic text-[#F5F6F7]/88 leading-snug mt-2"
          style={{ fontSize: "clamp(1.05rem, 2.3vw, 1.75rem)" }}
        >
          Beers, Food, Cocktails &amp; Rock N&apos; Roll
        </p>

        {/* Sub */}
        <p className="opacity-0 font-mono text-[#8D949E] mt-3 uppercase tracking-widest"
          style={{ fontSize: "0.75rem" }}>
          Santo Domingo · Piantini
        </p>

        {/* CTAs */}
        <div className="opacity-0 flex flex-wrap items-center justify-center gap-4 mt-9">
          <button
            onClick={() => document.querySelector("#eventos")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-magnetic bg-[#31A73B] text-white font-sans font-bold rounded-full px-8 py-4"
            style={{ fontSize: "0.95rem" }}
          >
            <span className="btn-slide bg-[#00A400]" />
            <span>Ver Eventos</span>
          </button>
          <button
            onClick={() => document.querySelector("#reserva")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-magnetic border font-sans font-medium rounded-full px-8 py-4 bg-transparent transition-colors duration-300"
            style={{ borderColor: "#8D949E", color: "#F5F6F7", fontSize: "0.95rem" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#31A73B"; e.currentTarget.style.color = "#51CE70"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#8D949E"; e.currentTarget.style.color = "#F5F6F7"; }}
          >
            <span>Reservar Mesa</span>
          </button>
        </div>

        {/* Trust strip */}
        <div className="opacity-0 flex flex-wrap items-center justify-center gap-6 mt-8 font-mono uppercase tracking-widest"
          style={{ fontSize: "0.72rem", color: "#8D949E" }}>
          <span>34K Seguidores</span>
          <span style={{ color: "#31A73B" }}>·</span>
          <span>4.6★ Rating</span>
          <span style={{ color: "#31A73B" }}>·</span>
          <span>Live Music Semanal</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector("#eventos")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 bg-transparent transition-colors duration-300"
        style={{ color: "#606770" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#31A73B"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#606770"; }}
        aria-label="Scroll"
      >
        <span className="font-mono uppercase tracking-widest" style={{ fontSize: "0.65rem" }}>Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
