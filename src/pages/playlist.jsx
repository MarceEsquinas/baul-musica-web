import { useEffect, useState, useCallback } from "react";
import { CreateListForm } from "../components/createListForm";
import { DeleteListButton } from "../components/deleteListButton";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const Playlist = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLists = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay sesión iniciada");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:2000/api/playlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "No se pudo cargar las listas");
      else setLists(data);
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadLists(); }, [loadLists]);

  const handleCreated = async (nueva) => {
    setLists((prev) => [{ ...nueva, num_elementos: nueva.num_elementos ?? 0 }, ...prev]);
    await loadLists(); // revalidar
  };

  // Quitar/Restaurar en caso de error
  const handleDeleted = (idLista, opts = {}) => {
    if (opts.revert) {
      // recarga desde servidor si hubo error
      loadLists();
      return;
    }
    setLists((prev) => prev.filter((l) => l.id_lista !== idLista));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">Cargando listas…</div>;
  if (error)   return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-300">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-6 py-10 w-full">
        <h1 className="text-2xl font-bold mb-4">Tus listas</h1>

        <CreateListForm onCreated={handleCreated} />

        {lists.length === 0 ? (
          <div className="text-gray-300">No tienes listas aún.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((l) => (
              <li key={l.id_lista} className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-pink-500/40 transition">
                <h3 className="text-lg font-semibold text-white">{l.nombre_lista}</h3>
                <p className="text-sm text-gray-400 mt-1">{l.num_elementos} elementos</p>
                {l.creada_en && (
                  <p className="text-xs text-gray-500 mt-2">
                    Creada: {new Date(l.creada_en).toLocaleDateString()}
                  </p>
                )}

                {/* Botón eliminar */}
                <DeleteListButton idLista={l.id_lista} onDeleted={handleDeleted} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

/*import { useEffect, useState, useCallback } from "react";
import { CreateListForm } from "../components/createListForm";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const Playlist = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLists = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay sesión iniciada");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:2000/api/playlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "No se pudo cargar las listas");
      else setLists(data);
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const handleCreated = async (nueva) => {
    setLists((prev) => [{ ...nueva, num_elementos: nueva.num_elementos ?? 0 }, ...prev]);
    await loadLists();
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">Cargando listas…</div>;
  if (error)
    return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-300">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      
      <Header />

      <main className="flex-1 mx-auto max-w-5xl px-6 py-10 w-full">
        <h1 className="text-2xl font-bold mb-4">Tus listas</h1>

        <CreateListForm onCreated={handleCreated} />

        {lists.length === 0 ? (
          <div className="text-gray-300">No tienes listas aún.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((l) => (
              <li
                key={l.id_lista}
                className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-pink-500/40 transition"
              >
                <h3 className="text-lg font-semibold text-white">{l.nombre_lista}</h3>
                <p className="text-sm text-gray-400 mt-1">{l.num_elementos} elementos</p>
                {l.creada_en && (
                  <p className="text-xs text-gray-500 mt-2">
                    Creada: {new Date(l.creada_en).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
};
*/