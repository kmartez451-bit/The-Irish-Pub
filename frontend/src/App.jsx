import { useState, useEffect } from "react";
import "./index.css";

import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Eventos   from "./components/Eventos";
import Reserva   from "./components/Reserva";
import Marcas    from "./components/Marcas";
import Ubicacion from "./components/Ubicacion";
import Footer    from "./components/Footer";

/**
 * Tries to load content.json from the public folder (populated by the scraper pipeline).
 * Falls back to empty state so the site always renders with Unsplash fallbacks.
 */
async function loadContent() {
  try {
    const res = await fetch("/content.json");
    if (!res.ok) throw new Error("not found");
    return await res.json();
  } catch {
    return { profile: null, posts: [], categories: [] };
  }
}

export default function App() {
  const [content, setContent] = useState({ profile: null, posts: [], categories: [] });

  useEffect(() => {
    loadContent().then(setContent);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F0E8]">
      <Navbar />

      <main>
        <Hero posts={content.posts} />

        <Eventos posts={content.posts} />

        <Reserva />

        <Marcas />

        <Ubicacion />
      </main>

      <Footer />
    </div>
  );
}
