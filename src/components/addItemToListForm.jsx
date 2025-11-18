//usuario carga la lista con canciones o albums y actualiza.
import { useEffect, useState } from "react";

export const AddItemToListForm = ({ idLista, onAdded }) => {
  const [tipo, setTipo] = useState("");
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // 🔄 Cargar álbumes y canciones del usuario
  useEffect(() => {
    if (!token) {
      setError("No hay sesión");
      return;
    }

    (async () => {
      try {
        const [ra, rs] = await Promise.all([
          fetch("http://localhost:2000/api/albums", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:2000/api/songs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [da, ds] = await Promise.all([ra.json(), rs.json()]);

        if (ra.ok) setAlbums(da);
        if (rs.ok) setSongs(ds);
      } catch {
        setError("Error cargando álbumes o canciones");
      }
    })();
  }, [token]);

  // 📌 Enviar al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tipo) return setError("Selecciona tipo");
    if (!selectedId) return setError("Selecciona un elemento");

    try {
      const res = await fetch(`http://localhost:2000/api/lists/${idLista}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tipo,
          id_album: tipo === "album" ? parseInt(selectedId, 10) : null,
          id_cancion: tipo === "cancion" ? parseInt(selectedId, 10) : null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "No se pudo añadir a la lista");
        return;
      }

      // Avisar al padre de que se ha añadido
      onAdded?.();
      setSelectedId("");
      setTipo("");

    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl bg-gray-900 p-4 border border-gray-700"
    >
      <h3 className="font-semibold text-white">Añadir a esta lista</h3>

      {/* Tipo: álbum o canción */}
      <select
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setSelectedId("");
        }}
        className="w-full rounded bg-gray-800 text-gray-100 border border-gray-700 p-2"
      >
        <option value="">Selecciona tipo...</option>
        <option value="album">Álbum</option>
        <option value="cancion">Canción</option>
      </select>

      {/* Selector dinámico según tipo */}
      {tipo === "album" && (
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded bg-gray-800 text-gray-100 border border-gray-700 p-2"
        >
          <option value="">Selecciona álbum...</option>
          {albums.map((a) => (
            <option key={a.id_album} value={a.id_album}>
              {a.nombre_album}
            </option>
          ))}
        </select>
      )}

      {tipo === "cancion" && (
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded bg-gray-800 text-gray-100 border border-gray-700 p-2"
        >
          <option value="">Selecciona canción...</option>
          {songs.map((s) => (
            <option key={s.id_cancion} value={s.id_cancion}>
              {s.nombre_cancion}
            </option>
          ))}
        </select>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="rounded bg-pink-600 px-4 py-2 text-white font-medium hover:bg-pink-500"
      >
        Añadir a la lista
      </button>
    </form>
  );
};
