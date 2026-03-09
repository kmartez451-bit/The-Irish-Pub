import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  { name: "Barceló",        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ron_Barcel%C3%B3_logo.svg/200px-Ron_Barcel%C3%B3_logo.svg.png", type: "Ron Dominicano",   color: "#C9891A" },
  { name: "Corona",         logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Corona_Extra.svg/200px-Corona_Extra.svg.png",                     type: "Cerveza Mexicana", color: "#F5C518" },
  { name: "Deep Eddy",      logo: "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_pb_x600.png",                                                       type: "Vodka",            color: "#E63946" },
  { name: "Heineken",       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Heineken_logo.svg/200px-Heineken_logo.svg.png",                    type: "Cerveza Holandesa",color: "#00843D" },
  { name: "Blue Moon",      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Blue_Moon_Beer_logo.svg/200px-Blue_Moon_Beer_logo.svg.png",        type: "Wheat Beer",       color: "#1E90FF" },
  { name: "Jarana",         logo: "https://www.jaranabeer.com/wp-content/uploads/2020/03/jarana-logo.png",                                                      type: "Cerveza Mexicana", color: "#FF6B35" },
  { name: "5.0 Original",   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/5.0_Original_logo.svg/200px-5.0_Original_logo.svg.png",           type: "Cerveza Alemana",  color: "#003087" },
  { name: "Jameson",        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jameson_Irish_Whiskey.svg/200px-Jameson_Irish_Whiskey.svg.png",    type: "Irish Whiskey",    color: "#31A73B" },
  { name: "Jack Daniel's",  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jack_Daniel%27s_Logo.svg/200px-Jack_Daniel%27s_Logo.svg.png",     type: "Tennessee Fire",   color: "#C9891A" },
  { name: "Presidente",     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cerveza_Presidente_logo.svg/200px-Cerveza_Presidente_logo.svg.png",type: "Cerveza Dominicana",color: "#003087" },
];

const MARQUEE_BRANDS = [...BRANDS, ...BRANDS];

function BrandCard({ brand }) {
  return (
    <div
      className="group flex flex-col items-center gap-3 rounded-[1.5rem] p-5 border cursor-default"
      style={{ background: "#303338", borderColor: "#444950", transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${brand.color}20`;
        e.currentTarget.style.borderColor = `${brand.color}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "#444950";
      }}
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
          }}
        />
        <span
          className="hidden w-14 h-14 items-center justify-center font-sans font-black text-xl rounded-full"
          style={{ color: brand.color, background: `${brand.color}18` }}
        >
          {brand.name[0]}
        </span>
      </div>
      <div className="text-center">
        <p className="font-sans font-semibold text-[#F5F6F7]" style={{ fontSize: "0.9rem" }}>{brand.name}</p>
        <p className="font-mono uppercase tracking-wider mt-0.5" style={{ fontSize: "0.65rem", color: "#8D949E" }}>{brand.type}</p>
      </div>
    </div>
  );
}

export default function Marcas() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="marcas" ref={sectionRef} className="py-24 overflow-hidden"
      style={{ background: "#1C1E21" }}>

      {/* Marquee strip */}
      <div className="mb-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1C1E21, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #1C1E21, transparent)" }} />
        <div className="marquee-track py-4">
          {MARQUEE_BRANDS.map((brand, i) => (
            <div key={`${brand.name}-${i}`}
              className="flex items-center gap-3 mx-10 cursor-default"
              style={{ opacity: 0.28, transition: "opacity 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.28"; }}
            >
              <img src={brand.logo} alt={brand.name} className="h-7 object-contain filter grayscale"
                onError={(e) => { e.target.style.display = "none"; }} />
              <span className="font-sans font-bold text-[#F5F6F7] whitespace-nowrap" style={{ fontSize: "0.9rem" }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef}>
          <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: "0.75rem", color: "#31A73B" }}>
            Lo que servimos
          </p>
          <h2 className="font-sans font-black text-[#F5F6F7] leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}>
            Marcas Utilizadas
          </h2>
          <p className="text-[#8D949E] max-w-lg mb-12" style={{ fontSize: "1rem" }}>
            Desde el ron dominicano de Barceló hasta el Irish Whiskey de Jameson —
            todo lo que necesitas para una noche perfecta.
          </p>
        </div>

        <div ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BRANDS.map((brand) => <BrandCard key={brand.name} brand={brand} />)}
        </div>

        {/* Bebidas.png strip */}
        <div className="mt-12 rounded-[2rem] overflow-hidden border" style={{ borderColor: "#444950" }}>
          <img
            src="/Bebidas.png"
            alt="Bebidas disponibles en The Irish Pub RD"
            className="w-full object-contain"
            style={{ background: "#303338", padding: "16px 32px", maxHeight: "88px" }}
          />
        </div>

        <p className="mt-6 font-mono uppercase tracking-widest text-center" style={{ fontSize: "0.65rem", color: "#606770" }}>
          Carta completa disponible en el bar · Preguntar al bartender
        </p>
      </div>
    </section>
  );
}
