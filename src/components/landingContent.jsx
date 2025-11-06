// src/components/landingContent.jsx
import { Link } from "react-router-dom";
import bg from "../assets/logo-dany.png"; //imagen

export const LandingContent = () => {
  return (
    <section className="relative min-h-[90vh] text-gray-100">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Contenido hero */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-12 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            El Baúl de la Música
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Organiza tus álbumes, crea listas y descubre joyas únicas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold shadow-lg shadow-pink-600/20 hover:bg-pink-500 transition"
            >
              Empieza ahora
            </Link>
            <Link
              to="/playlist"
              className="px-6 py-3 rounded-xl border border-white/70 text-white hover:border-pink-500 hover:text-pink-400 transition"
            >
              Ver listas
            </Link>
          </div>
        </div>
      </div>

      {/* Bloque de características */}
      <div className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            title="Organiza álbumes"
            desc="Búsqueda por título, artista y género."
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5h16v2H4zM4 11h10v2H4zM4 17h7v2H4z" />
              </svg>
            }
          />
          <Feature
            title="Listas personalizadas"
            desc="Favoritos, Por escuchar… tú eliges."
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="m12 17.27-4.15 2.4 1.1-4.73-3.63-3.14 4.8-.41L12 3l1.88 8.39 4.8.41-3.63 3.14 1.1 4.73z" />
              </svg>
            }
          />
          <Feature
            title="Reseñas y puntuaciones"
            desc="Comparte opiniones y descubre nuevas joyas."
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16v12H6l-2 2z" />
              </svg>
            }
          />
          <Feature
            title="Ligera y rápida"
            desc="UI con React + Tailwind, lista para móvil."
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12a9 9 0 1 1 18 0A9 9 0 0 1 3 12zm9-7v6l5 3" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title, desc, icon }) => (
  <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm hover:border-pink-500/40 transition">
    <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-pink-500/15 p-2 text-pink-400">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-1 text-sm text-gray-300">{desc}</p>
  </div>
);

/*import axios from "axios"
import { useEffect, useState } from "react"
export const LandingContent = () => {

    const [frase, setFrase] = useState("")

    function CargarFraseDelDia() {
        axios.get("http://localhost:2000/").then(resp => {
            setFrase(resp.data.frase)
        })
    }
    
    useEffect(() => {
        CargarFraseDelDia()
    },[])
    return (
        <div class="h-full">
            Este es el contenido de la pagina
            <div>La fase del dia es:</div>
            <p>{frase}</p>
            <button className="p-2 bg-green-400 rounded-lg cursor-pointer" onClick={CargarFraseDelDia}>Obtener Frase</button>
        </div>
    )
}*/