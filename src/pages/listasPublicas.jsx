import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const ListasPublicas = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPublicLists = async () => {
      if (!token) {
        setError("Debes iniciar sesión para ver las listas públicas");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:2000/api/lists/public", {
  headers: { Authorization: `Bearer ${token}` },
});

   
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          setError(data.message || "No se pudieron cargar las listas públicas");
        } else {
          setLists(data);
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicLists();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
        Cargando listas públicas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-300">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold">Listas públicas</h1>

        {lists.length === 0 ? (
          <p className="text-gray-300">
            Aún no hay listas públicas creadas por otros usuarios.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lists.map((l) => (
              <li
                key={l.id_lista}
                className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-pink-500/40 transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {l.nombre_lista}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Creador: {l.nombre_usuario} {l.apellidos_usuario}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {l.num_elementos} elementos
                </p>
                {l.creada_en && (
                  <p className="text-xs text-gray-500 mt-2">
                    Creada el {new Date(l.creada_en).toLocaleDateString()}
                  </p>
                )}
                {/* Más adelante: botón para ver detalles públicos, reseñas, etc. */}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};
