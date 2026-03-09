import { useRef, useState } from "react";
import { Phone, MessageCircle, Clock, CheckCircle } from "lucide-react";

const PARTY_OPTIONS = ["1-2 personas", "3-4 personas", "5-6 personas", "7-10 personas", "Grupo grande (+10)"];

export default function Reserva() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "", party: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola The Irish Pub RD! 🍺\n\n` +
      `Quisiera reservar una mesa:\n` +
      `• Nombre: ${form.name}\n` +
      `• Fecha: ${form.date}\n` +
      `• Personas: ${form.party}\n` +
      (form.message ? `• Nota: ${form.message}` : "")
    );
    window.open(`https://wa.me/18295238025?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="reserva"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "linear-gradient(135deg, #303338 0%, #1C1E21 100%)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: "0.75rem", color: "#31A73B" }}>
            Reservaciones
          </p>
          <h2 className="font-sans font-black text-[#F5F6F7] leading-none tracking-tighter mb-3"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            Tu mesa.
          </h2>
          <h2 className="font-serif italic leading-none mb-8"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", color: "#C9891A" }}>
            Tu noche.
          </h2>
          <p className="text-[#8D949E] leading-relaxed mb-10 max-w-md" style={{ fontSize: "1rem" }}>
            Reserva tu mesa y garantiza tu lugar para las noches de música en vivo,
            eventos deportivos y fiestas temáticas.
          </p>

          <div className="space-y-5">
            {[
              { Icon: Phone, label: "Teléfono", text: "+1 829-523-8025", href: "tel:+18295238025" },
              { Icon: MessageCircle, label: "WhatsApp", text: "Escríbenos directamente", href: "https://wa.me/18295238025" },
              { Icon: Clock, label: "Horario", text: "Lun – Dom: 6:00 PM – 2:00 AM", href: null },
            ].map(({ Icon, label, text, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#444950" }}>
                  <Icon size={19} style={{ color: "#31A73B" }} />
                </div>
                <div>
                  <p className="font-mono uppercase tracking-widest" style={{ fontSize: "0.65rem", color: "#606770" }}>{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link-lift font-sans font-semibold text-[#F5F6F7]"
                      style={{ fontSize: "1rem" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#51CE70"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#F5F6F7"; }}>
                      {text}
                    </a>
                  ) : (
                    <p className="font-sans font-semibold text-[#F5F6F7]" style={{ fontSize: "1rem" }}>{text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="backdrop-blur-sm rounded-[2rem] p-8"
          style={{ background: "#303338", border: "1px solid #444950" }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <CheckCircle size={52} style={{ color: "#31A73B" }} />
              <h3 className="font-sans font-bold text-[#F5F6F7]" style={{ fontSize: "1.25rem" }}>¡Reserva enviada!</h3>
              <p className="text-[#8D949E] max-w-xs" style={{ fontSize: "0.9rem" }}>
                Te hemos redirigido a WhatsApp para confirmar tu reservación.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name",  label: "Nombre completo",     type: "text", placeholder: "Tu nombre",         required: true },
                { name: "phone", label: "Teléfono / WhatsApp",  type: "tel",  placeholder: "+1 809 000 0000",   required: false },
              ].map(({ name, label, type, placeholder, required }) => (
                <div key={name}>
                  <label className="font-mono uppercase tracking-widest block mb-2"
                    style={{ fontSize: "0.65rem", color: "#8D949E" }}>{label}</label>
                  <input name={name} value={form[name]} onChange={handleChange}
                    type={type} placeholder={placeholder} required={required} className="field" />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-2"
                    style={{ fontSize: "0.65rem", color: "#8D949E" }}>Fecha</label>
                  <input name="date" value={form.date} onChange={handleChange}
                    type="date" required className="field" />
                </div>
                <div>
                  <label className="font-mono uppercase tracking-widest block mb-2"
                    style={{ fontSize: "0.65rem", color: "#8D949E" }}>Personas</label>
                  <select name="party" value={form.party} onChange={handleChange} required className="field">
                    <option value="">Seleccionar</option>
                    {PARTY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono uppercase tracking-widest block mb-2"
                  style={{ fontSize: "0.65rem", color: "#8D949E" }}>Nota especial (opcional)</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Cumpleaños, grupo VIP, evento especial..."
                  rows={3} className="field resize-none" />
              </div>

              <button type="submit"
                className="btn-magnetic w-full font-sans font-bold rounded-2xl mt-2 py-4"
                style={{ background: "#31A73B", color: "#fff", fontSize: "0.95rem" }}>
                <span className="btn-slide" style={{ background: "#00A400" }} />
                <span>Enviar Reservación vía WhatsApp</span>
              </button>

              <p className="text-center font-mono uppercase tracking-wider"
                style={{ fontSize: "0.65rem", color: "#606770" }}>
                Te confirmaremos en menos de 2 horas
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
