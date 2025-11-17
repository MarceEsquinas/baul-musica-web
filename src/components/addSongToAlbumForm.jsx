import { useEffect, useState } from "react";

export const AddSongToAlbumForm = ({ onLinked }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [songId, setSongId] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (!token) return setError("No hay sesión");
      try {
        const [ra, rs] = await Promise.all([
          fetch("http://localhost:2000/api/albums", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:2000/api/songs",  { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        const [da, ds] = await Promise.all([ra.json(), rs.json()]);
        setAlbums(ra.ok ? da : []); setSongs(rs.ok ? ds : []);
      } catch { setError("Error cargando datos"); }
    })();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (!albumId || !songId) { setError("Selecciona álbum y canción"); return; }
    console.log("DEBUG vincular → albumId:", albumId, "songId:", songId);

    try {
      const res = await fetch(`http://localhost:2000/api/albums/${albumId}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id_cancion: parseInt(songId,10), genero: genero || null }),
      });
      const data = await res.json().catch(()=> ({}));
      if (!res.ok) { setError(data.message || "No se pudo asociar"); return; }
      setAlbumId(""); setSongId(""); setGenero("");
      onLinked?.({ ok: true });
    } catch { setError("Error de conexión"); }
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl bg-gray-900 p-4">
      <h3 className="font-semibold text-white">Añadir canción a álbum</h3>

      <select className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
              value={albumId} onChange={e=>setAlbumId(e.target.value)}>
        <option value="">Selecciona álbum</option>
        {albums.map(a => <option key={a.id_album} value={a.id_album}>{a.nombre_album}</option>)}
      </select>

      <select className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
              value={songId} onChange={e=>setSongId(e.target.value)}>
        <option value="">Selecciona canción</option>
        {songs.map(s => <option key={s.id_cancion} value={s.id_cancion}>{s.nombre_cancion}</option>)}
      </select>

      <input className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
             placeholder="Género (opcional)" value={genero} onChange={e=>setGenero(e.target.value)} />

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button className="rounded bg-pink-600 px-4 py-2 text-white font-medium hover:bg-pink-500">
        Vincular
      </button>
    </form>
  );
};
