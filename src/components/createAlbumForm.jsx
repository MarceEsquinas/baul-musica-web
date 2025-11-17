import { useState } from "react";

export const CreateAlbumForm = ({ onCreated }) => {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (!nombre.trim() || !genero.trim()) {
      setError("Nombre y género son obligatorios"); return;
    }
    const token = localStorage.getItem("token");
    if (!token) { setError("No hay sesión"); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nombre_album: nombre.trim(), genero: genero.trim(), fecha: fecha || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "No se pudo crear el álbum"); return; }
      setNombre(""); setGenero(""); setFecha(""); onCreated?.(data);
    } catch { setError("Error de conexión"); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl bg-gray-900 p-4">
      <h3 className="font-semibold text-white">Crear álbum</h3>
      <input className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
             placeholder="Nombre del álbum" value={nombre} onChange={e=>setNombre(e.target.value)} />
      <input className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
             placeholder="Género" value={genero} onChange={e=>setGenero(e.target.value)} />
      <input className="w-full rounded border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100"
             type="date" value={fecha} onChange={e=>setFecha(e.target.value)} />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button className="rounded bg-pink-600 px-4 py-2 text-white font-medium hover:bg-pink-500" disabled={loading}>
        {loading ? "Creando..." : "Crear álbum"}
      </button>
    </form>
  );
};
