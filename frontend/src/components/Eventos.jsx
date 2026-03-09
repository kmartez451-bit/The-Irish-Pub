import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Calendar, Music, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LINEUP_EVENTS = [
  {
    id: "ev-01", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Chester_Bennington_from_Linkin_Park_%40_Sonisphere.jpg/200px-Chester_Bennington_from_Linkin_Park_%40_Sonisphere.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Chester_Bennington_from_Linkin_Park_%40_Sonisphere.jpg",
    caption: "Tributo a LINKIN PARK — una noche de nu-metal y rock alternativo que no te puedes perder. 🎸",
    date: "Mar 4", day: "Martes", time: "09:45 PM",
    band: "LINKIN PARK", genre: "Nu Metal / Alt Rock",
    hashtags: ["#linkinpark", "#tribute", "#livemusic", "#theirishpubrd"],
    category: "eventos", featured: true,
  },
  {
    id: "ev-02", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Concierto_Gustavo_Cerati_%284120573409%29.jpg/200px-Concierto_Gustavo_Cerati_%284120573409%29.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Concierto_Gustavo_Cerati_%284120573409%29.jpg",
    caption: "SODA STEREO vive otra vez en The Irish Pub RD. Los clásicos del rock en español.",
    date: "Mar 5", day: "Miércoles", time: "09:45 PM",
    band: "SODA STEREO", genre: "Rock en Español",
    hashtags: ["#sodastereo", "#rockespanol", "#tributo"],
    category: "eventos",
  },
  {
    id: "ev-03", type: "image",
    thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&q=80",
    media: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=80",
    caption: "TOQUE PROFUNDO en el escenario del Irish Pub — groove, funk y rock fusión 🔥",
    date: "Mar 6", day: "Jueves", time: "09:45 PM",
    band: "TOQUE PROFUNDO", genre: "Rock / Funk",
    hashtags: ["#toqueprofundo", "#live", "#rockrd"],
    category: "eventos",
  },
  {
    id: "ev-04", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Heroes_del_Silencio_Sevilla_Oct_07_2.jpg/200px-Heroes_del_Silencio_Sevilla_Oct_07_2.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Heroes_del_Silencio_Sevilla_Oct_07_2.jpg",
    caption: "Tributo a HÉROES DEL SILENCIO — Bunbury vivirá en cada nota esta noche.",
    date: "Mar 7", day: "Viernes", time: "09:45 PM",
    band: "HÉROES DEL SILENCIO", genre: "Rock Alternativo",
    hashtags: ["#heroesdelsilencio", "#bunbury", "#tributo"],
    category: "eventos",
  },
  {
    id: "ev-05", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Guns_N_Roses_in_concert_in_London_on_1_July_2022_Axl_Rose.jpg/200px-Guns_N_Roses_in_concert_in_London_on_1_July_2022_Axl_Rose.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Guns_N_Roses_in_concert_in_London_on_1_July_2022_Axl_Rose.jpg",
    caption: "Tributo a GUNS N' ROSES — Welcome to the Jungle en The Irish Pub! 🎸🤘",
    date: "Mar 11", day: "Martes", time: "09:45 PM",
    band: "GUNS N' ROSES", genre: "Hard Rock / Heavy Metal",
    hashtags: ["#gunsnroses", "#hardrock", "#livemusic"],
    category: "eventos",
  },
  {
    id: "ev-06", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Brandon_Boyd_incubus_nova_rock_07.JPG/200px-Brandon_Boyd_incubus_nova_rock_07.JPG",
    media: "https://upload.wikimedia.org/wikipedia/commons/8/80/Brandon_Boyd_incubus_nova_rock_07.JPG",
    caption: "Tributo a INCUBUS — Make Yourself en vivo esta noche en Santo Domingo.",
    date: "Mar 12", day: "Miércoles", time: "09:45 PM",
    band: "INCUBUS", genre: "Alternative / Funk Rock",
    hashtags: ["#incubus", "#alternativerock", "#tribute"],
    category: "eventos",
  },
  {
    id: "ev-07", type: "image",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80",
    media: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=80",
    caption: "EDUARDO PUCHAU en vivo — el talento local que llena el Irish Pub.",
    date: "Mar 18", day: "Martes", time: "09:45 PM",
    band: "EDUARDO PUCHAU", genre: "Artista Local",
    hashtags: ["#eduardopuchau", "#musicalocal", "#livemusic"],
    category: "eventos",
  },
  {
    id: "ev-08", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Brian_Molko_-_Placebo_-_Frequency_Festival_-_2017-08-16-21-34-00.jpg/200px-Brian_Molko_-_Placebo_-_Frequency_Festival_-_2017-08-16-21-34-00.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Brian_Molko_-_Placebo_-_Frequency_Festival_-_2017-08-16-21-34-00.jpg",
    caption: "Tributo a PLACEBO & INTERPOL — dos íconos del indie rock en una misma noche.",
    date: "Mar 19", day: "Miércoles", time: "09:45 PM",
    band: "PLACEBO & INTERPOL", genre: "Indie / Post-Punk",
    hashtags: ["#placebo", "#interpol", "#indierock"],
    category: "eventos",
  },
  {
    id: "ev-09", type: "image",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Morat_en_concierto.jpg/200px-Morat_en_concierto.jpg",
    media: "https://upload.wikimedia.org/wikipedia/commons/0/05/Morat_en_concierto.jpg",
    caption: "MORAT en tributo — las canciones que todos conocemos de memoria.",
    date: "Mar 25", day: "Martes", time: "09:45 PM",
    band: "MORAT", genre: "Pop / Indie",
    hashtags: ["#morat", "#poprock", "#tributo"],
    category: "eventos",
  },
  {
    id: "ev-st1", type: "image",
    thumbnail: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=200&q=80",
    media: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=700&q=80",
    caption: "🍀 ST. PATRICK'S WEEK — Green beer, música en vivo y la mejor fiesta irlandesa de Santo Domingo.",
    date: "Mar 14–17", day: "St. Patrick's", time: "09:45 PM",
    band: "ST. PATRICK'S WEEK", genre: "Evento Especial",
    hashtags: ["#stpatricks", "#greenbeer", "#irish", "#theirishpubrd"],
    category: "eventos", featured: true,
  },
  {
    id: "bv-01", type: "image",
    media: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=600&q=80",
    caption: "Green beer — la tradición del Irish Pub cada St. Patrick's 🍺🍀",
    date: "Mar 17", day: "Lunes", time: "",
    band: "Green Beer", genre: "St. Patrick's Special",
    hashtags: ["#greenbeer", "#guinness", "#stpatricks"],
    category: "bebidas",
  },
  {
    id: "bv-02", type: "image",
    media: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=600&q=80",
    caption: "Craft beers on tap — siempre frescas 🍺",
    date: "", day: "", time: "",
    band: "Craft Beer", genre: "On Tap",
    hashtags: ["#craftbeer", "#beer", "#bar"],
    category: "bebidas",
  },
  {
    id: "bv-03", type: "image",
    media: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    caption: "Cocktails de autor — creatividad en cada vaso 🍹",
    date: "", day: "", time: "",
    band: "Signature Cocktails", genre: "Bar Menu",
    hashtags: ["#cocktails", "#bar", "#drinks"],
    category: "bebidas",
  },
  {
    id: "bv-04", type: "image",
    media: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&q=80",
    caption: "Whiskey & Spirits — la mejor selección de la ciudad 🥃",
    date: "", day: "", time: "",
    band: "Whiskey Bar", genre: "Premium Spirits",
    hashtags: ["#whiskey", "#jameson", "#jackdaniels"],
    category: "bebidas",
  },
];

const FILTERS = [
  { key: "eventos", label: "Line Up del Mes" },
  { key: "bebidas", label: "Bar & Drinks" },
  { key: "all",     label: "Todos" },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function LightboxModal({ post, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="relative max-w-2xl w-full rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: "#303338" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={post.media}
          alt={post.band || post.caption}
          className="w-full object-cover"
          style={{ maxHeight: "55vh" }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=60"; }}
        />
        <div className="p-7">
          {post.band && (
            <h3 className="font-sans font-black text-[#F5F6F7] text-2xl tracking-tight mb-1">{post.band}</h3>
          )}
          {post.genre && (
            <p className="font-mono text-[#31A73B] text-xs uppercase tracking-widest mb-4">{post.genre}</p>
          )}
          {(post.day || post.date) && (
            <div className="flex items-center gap-2 text-[#C9891A] font-mono text-sm mb-3">
              <Calendar size={13} />
              <span>{post.day} {post.date}{post.time && ` · ${post.time}`}</span>
            </div>
          )}
          {post.caption && (
            <p className="text-[#BEC3C9] text-sm leading-relaxed mb-4">{post.caption}</p>
          )}
          {post.hashtags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.hashtags.slice(0, 5).map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-[#31A73B]/80 bg-[#31A73B]/12 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 transition-colors duration-200"
          style={{ background: "rgba(28,30,33,0.70)", color: "#F5F6F7" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#31A73B"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(28,30,33,0.70)"; }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Eventos({ posts = [] }) {
  const [filter, setFilter] = useState("eventos");
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const allPosts = posts.length > 0
    ? [...LINEUP_EVENTS, ...posts.filter((p) => !LINEUP_EVENTS.find((l) => l.id === p.id))]
    : LINEUP_EVENTS;

  const filtered = filter === "all" ? allPosts : allPosts.filter((p) => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="eventos" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">

      {/* Heading */}
      <div ref={headingRef} className="mb-12">
        <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: "0.75rem", color: "#31A73B" }}>
          Marzo 2025
        </p>
        <h2 className="font-sans font-black text-[#F5F6F7] leading-none tracking-tighter"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}>
          Line Up del Mes
        </h2>
        <p className="text-[#8D949E] mt-3 text-base max-w-xl">
          Noches de música en vivo — tributos, artistas locales y el mejor rock de la ciudad.
          <span className="block mt-1 font-mono uppercase tracking-wider" style={{ fontSize: "0.75rem", color: "#31A73B" }}>
            09:45 PM · Lunes a Sábado
          </span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="btn-magnetic font-mono uppercase tracking-wider px-5 py-2.5 rounded-full border bg-transparent transition-all duration-300"
            style={{
              fontSize: "0.75rem",
              borderColor: filter === f.key ? "#31A73B" : "#444950",
              color:       filter === f.key ? "#51CE70"  : "#8D949E",
              background:  filter === f.key ? "rgba(49,167,59,0.12)" : "transparent",
            }}
          >
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Lineup list */}
      {filter === "eventos" ? (
        <div className="space-y-3 mb-8">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelected(post)}
              className="group flex items-center gap-5 p-4 rounded-[1.5rem] border cursor-pointer transition-all duration-300"
              style={{
                borderColor: post.featured ? "rgba(49,167,59,0.45)" : "#444950",
                background:  post.featured ? "rgba(49,167,59,0.08)" : "#303338",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#31A73B"; e.currentTarget.style.background = "rgba(49,167,59,0.10)"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = post.featured ? "rgba(49,167,59,0.45)" : "#444950";
                e.currentTarget.style.background  = post.featured ? "rgba(49,167,59,0.08)" : "#303338";
              }}
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-14 h-14 rounded-[0.75rem] overflow-hidden border border-[#444950]">
                <img
                  src={post.thumbnail || post.media}
                  alt={post.band}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&q=60"; }}
                />
              </div>

              {/* Date column */}
              <div className="flex-shrink-0 w-14 text-center">
                <p className="font-mono uppercase tracking-widest leading-none mb-1"
                  style={{ fontSize: "0.65rem", color: "#606770" }}>{post.day}</p>
                <p className="font-sans font-black text-[#C9891A] leading-none" style={{ fontSize: "1.35rem" }}>
                  {post.date?.replace("Mar ", "") || "—"}
                </p>
                <p className="font-mono uppercase" style={{ fontSize: "0.6rem", color: "#606770", marginTop: "2px" }}>Mar</p>
              </div>

              <div className="w-px h-10 bg-[#444950] flex-shrink-0" />

              {/* Band */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-sans font-black text-[#F5F6F7] leading-tight tracking-tight"
                    style={{ fontSize: "1.05rem" }}>{post.band}</h3>
                  {post.featured && (
                    <span className="font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{ fontSize: "0.65rem", background: "#31A73B", color: "#fff" }}>
                      <Star size={8} fill="currentColor" />Especial
                    </span>
                  )}
                </div>
                <p className="font-mono uppercase tracking-wider mt-0.5"
                  style={{ fontSize: "0.7rem", color: "#51CE70" }}>{post.genre}</p>
              </div>

              {/* Time */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <Music size={14} style={{ color: "#606770" }} />
                <span className="font-mono" style={{ fontSize: "0.8rem", color: "#8D949E" }}>{post.time}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="masonry-grid">
          {filtered.map((post) => (
            <div key={post.id} className="masonry-item group cursor-pointer" onClick={() => setSelected(post)}>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-[#444950]"
                style={{ background: "#303338" }}>
                <img
                  src={post.media}
                  alt={post.band || post.caption?.slice(0, 60)}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=60"; }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-[1.5rem] flex flex-col justify-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(28,30,33,0.95) 0%, transparent 60%)" }}>
                  {post.caption && (
                    <p className="text-[#F5F6F7] leading-snug line-clamp-2" style={{ fontSize: "0.82rem" }}>{post.caption}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* St. Patrick's banner */}
      {filter === "eventos" && (
        <div className="mt-8 p-7 rounded-[2rem] border flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            borderColor: "rgba(49,167,59,0.40)",
            background: "linear-gradient(135deg, rgba(49,167,59,0.10), rgba(48,51,56,0.60))",
          }}>
          <div>
            <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: "0.72rem", color: "#31A73B" }}>14–17 Marzo</p>
            <h4 className="font-sans font-black text-[#F5F6F7]" style={{ fontSize: "1.4rem" }}>🍀 St. Patrick's Week</h4>
            <p className="text-[#8D949E] mt-1" style={{ fontSize: "0.9rem" }}>
              La celebración más grande del año — green beer, música en vivo y mucho más.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#reserva")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-magnetic flex-shrink-0 font-sans font-bold rounded-full px-7 py-3.5"
            style={{ background: "#31A73B", color: "#fff", fontSize: "0.9rem" }}
          >
            <span className="btn-slide" style={{ background: "#00A400" }} />
            <span>Reservar para St. Patrick's</span>
          </button>
        </div>
      )}

      {selected && <LightboxModal post={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
