// src/components/ReviewWidget.jsx
import { useEffect, useState } from "react";

export const ReviewWidget = ({ idElemento }) => {
  const [rating, setRating] = useState(5);
  const [member, setMember] = useState("");
  const [stats, setStats] = useState({ media: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadStats = async () => {
    if (!token) return; // si no hay sesión, no hacemos nada

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:2000/api/reviews/element/${idElemento}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json().catch(() => ({
        media: 0,
        total: 0,
        reseñas: [],
      }));

      if (!res.ok) {
        setError(data.message || "No se pudieron cargar las reseñas");
      } else {
        setStats({ media: Number(data.media) || 0, total: Number(data.total) || 0 });
      }
    } catch {
      setError("Error de conexión al cargar reseñas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idElemento]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Debes iniciar sesión para valorar");
      return;
    }

    setSending(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:2000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_elemento_lista: idElemento,
          puntuacion: Number(rating),
          mejor_musico: member.trim() || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "No se pudo guardar la reseña");
      } else {
        setMessage("Reseña guardada ✅");
        setMember("");
        // recargar estadísticas
        loadStats();
      }
    } catch {
      setError("Error de conexión al enviar reseña");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-gray-200">
      {/* Resumen de puntuación */}
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-100">Valoraciones</p>
          {loading ? (
            <p className="text-[11px] text-gray-400">Cargando…</p>
          ) : (
            <p className="text-[11px] text-gray-400">
              Media: <span className="text-pink-300">{stats.media}</span> / 5 ·{" "}
              <span>{stats.total}</span> reseña{stats.total === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-gray-400">
            Mejor miembro de la banda
          </label>
          <input
            type="text"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            className="rounded bg-gray-900/70 px-2 py-1 text-xs outline-none ring-1 ring-white/10 focus:ring-pink-500"
            placeholder="Batería, vocalista, guitarrista…"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-[11px] text-gray-400">Puntuación</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rounded bg-gray-900/70 px-2 py-1 text-xs outline-none ring-1 ring-white/10 focus:ring-pink-500"
          >
            <option value={1}>1 ⭐</option>
            <option value={2}>2 ⭐⭐</option>
            <option value={3}>3 ⭐⭐⭐</option>
            <option value={4}>4 ⭐⭐⭐⭐</option>
            <option value={5}>5 ⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={sending}
            className="rounded bg-pink-600 px-3 py-1 text-xs font-semibold text-white hover:bg-pink-500 disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Guardar reseña"}
          </button>
          {message && (
            <span className="text-[11px] text-emerald-300">{message}</span>
          )}
        </div>

        {error && <p className="text-[11px] text-red-400">{error}</p>}
      </form>
    </div>
  );
};
