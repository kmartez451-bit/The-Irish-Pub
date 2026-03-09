import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Dirección", value: "C Manuel de Jesús Troncoso, Santo Domingo 10127", link: "https://maps.google.com/?q=The+Irish+Pub+Santo+Domingo" },
  { icon: Phone,  label: "Teléfono",  value: "+1 829-523-8025",                                  link: "tel:+18295238025" },
  { icon: Clock,  label: "Horario",   value: "Lun – Dom: 6:00 PM – 2:00 AM",                     link: null },
];

const SOCIAL_LINKS = [
  { icon: Instagram,     label: "Instagram", handle: "@theirishpubrd",    link: "https://www.instagram.com/theirishpubrd/", color: "#C9891A"  },
  { icon: MessageCircle, label: "WhatsApp",  handle: "+1 829-523-8025",   link: "https://wa.me/18295238025",               color: "#25D366"  },
  { icon: Facebook,      label: "Facebook",  handle: "The Irish Pub RD",  link: "https://www.facebook.com/theirishpubrd",  color: "#1877F2"  },
];

export default function Ubicacion() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,  { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(rightRef.current, { opacity: 0, x:  40 }, {
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ubicacion" ref={sectionRef} className="py-24 px-6"
      style={{ background: "#1C1E21" }}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-14">
          <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: "0.75rem", color: "#31A73B" }}>
            Encuéntranos
          </p>
          <h2 className="font-sans font-black text-[#F5F6F7] leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}>
            Ubicación &amp; Contacto
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left */}
          <div ref={leftRef} className="space-y-10">
            <div className="space-y-6">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, link }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "#303338", border: "1px solid #444950" }}>
                    <Icon size={19} style={{ color: "#31A73B" }} />
                  </div>
                  <div>
                    <p className="font-mono uppercase tracking-widest mb-1"
                      style={{ fontSize: "0.65rem", color: "#606770" }}>{label}</p>
                    {link ? (
                      <a href={link}
                        target={link.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="link-lift font-sans font-semibold text-[#F5F6F7] flex items-center gap-1"
                        style={{ fontSize: "1rem" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F6F7"; }}
                      >
                        {value}
                        {link.startsWith("http") && <ExternalLink size={12} style={{ opacity: 0.4 }} />}
                      </a>
                    ) : (
                      <p className="font-sans font-semibold text-[#F5F6F7]" style={{ fontSize: "1rem" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: "linear-gradient(to right, #444950, transparent)" }} />

            {/* Social */}
            <div>
              <p className="font-mono uppercase tracking-widest mb-5"
                style={{ fontSize: "0.65rem", color: "#606770" }}>Redes Sociales</p>
              <div className="space-y-4">
                {SOCIAL_LINKS.map(({ icon: Icon, label, handle, link, color }) => (
                  <a key={label} href={link} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 link-lift">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={19} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-[#F5F6F7] transition-colors duration-200"
                        style={{ fontSize: "0.95rem" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F6F7"; }}
                      >{label}</p>
                      <p className="font-mono" style={{ fontSize: "0.72rem", color: "#8D949E" }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a href="https://wa.me/18295238025" target="_blank" rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center gap-3 font-sans font-bold rounded-full px-7 py-4"
              style={{ background: "#31A73B", color: "#fff", fontSize: "0.95rem" }}>
              <span className="btn-slide" style={{ background: "#00A400" }} />
              <MessageCircle size={17} />
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>

          {/* Right — Map */}
          <div ref={rightRef}
            className="rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50"
            style={{ minHeight: "440px", border: "1px solid #444950" }}>
            <iframe
              title="The Irish Pub RD — Ubicación"
              width="100%"
              height="100%"
              style={{ minHeight: "440px", border: 0, display: "block" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5!2d-69.9298!3d18.4718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf895f66e6e2b5%3A0x1234567890abcdef!2sThe%20Irish%20Pub!5e0!3m2!1ses!2sdo!4v1710000000000!5m2!1ses!2sdo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
