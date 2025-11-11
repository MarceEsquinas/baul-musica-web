import { useState } from "react";

export const CreateListForm = ({ onCreated }) => {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay sesión");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre_lista: nombre.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "No se pudo crear la lista");
        return;
      }
      setNombre("");
      onCreated?.(data); // pasa la lista creada al padre
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Nombre de la lista"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="flex-1 rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm text-gray-100 focus:border-pink-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-pink-600 px-4 py-2 text-white font-medium hover:bg-pink-500 transition disabled:opacity-50"
      >
        {loading ? "Creando..." : "Crear"}
      </button>
      {error && <span className="text-sm text-red-400">{error}</span>}
    </form>
  );
};
