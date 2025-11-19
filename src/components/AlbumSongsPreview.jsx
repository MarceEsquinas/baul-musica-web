import { useState } from "react";

export const AlbumSongsPreview = ({ albumId }) => {
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const toggle = async () => {
    // si cerramos, simplemente ocultar
    if (open) {
      setOpen(false);
      return;
    }

    // si abrimos por primera vez, cargamos
    setOpen(true);

    if (songs.length > 0) return; // ya cargadas

    if (!token) {
      setError("No hay sesión");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:2000/api/albums/${albumId}/songs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => []);

      if (!res.ok) {
        setError(data.message || "No se pudieron cargar las canciones");
      } else {
        setSongs(data);
      }
    } catch {
      setError("Error de conexión al cargar canciones");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={toggle}
        className="text-xs text-pink-400 hover:text-pink-300"
      >
        {open ? "Ocultar canciones" : "Ver canciones"}
      </button>

      {open && (
        <div className="mt-1 pl-3 border-l border-gray-700">
          {loading && (
            <p className="text-xs text-gray-400">Cargando canciones...</p>
          )}
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
          {!loading && !error && songs.length === 0 && (
            <p className="text-xs text-gray-400">
              Este álbum no tiene canciones asociadas.
            </p>
          )}
          {!loading && !error && songs.length > 0 && (
            <ul className="space-y-1">
              {songs.map((s) => (
                <li key={s.id_cancion} className="text-xs text-gray-200">
                  • {s.nombre_cancion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
