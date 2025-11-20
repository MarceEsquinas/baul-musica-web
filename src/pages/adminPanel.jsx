import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const AdminPanel = () => {
  const [tab, setTab] = useState("usuarios");
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (tab === "usuarios") loadUsers();
    if (tab === "reviews") loadReviews();
  }, [tab]);

  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Error cargando usuarios");
    }
  };

  const loadReviews = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReviews(data);
    } catch {
      setError("Error cargando reseñas");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Seguro que quieres borrar este usuario?")) return;

    await fetch(`http://localhost:2000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadUsers();
  };

  const deleteReview = async (id) => {
    if (!confirm("¿Eliminar esta reseña?")) return;

    await fetch(`http://localhost:2000/api/admin/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadReviews();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-2xl font-bold">Panel de administración</h1>

        <div className="flex gap-4">
          <button onClick={() => setTab("usuarios")} className="px-3 py-1 bg-pink-600 rounded">
            Usuarios
          </button>
          <button onClick={() => setTab("reviews")} className="px-3 py-1 bg-pink-600 rounded">
            Reseñas
          </button>
        </div>

        {tab === "usuarios" && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Gestión de usuarios</h2>
            {users.map((u) => (
              <div key={u.id_usuario} className="flex justify-between p-2 border-b border-white/10">
                <span>{u.nombre} {u.apellidos} ({u.rol})</span>
                <button className="text-red-400" onClick={() => deleteUser(u.id_usuario)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Reseñas</h2>
            {reviews.map((r) => (
              <div key={r.id_resenia} className="flex justify-between p-2 border-b border-white/10">
                <span>{r.usuario}: {r.puntuacion}⭐ — {r.mejor_musico}</span>
                <button className="text-red-400" onClick={() => deleteReview(r.id_resenia)}>
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
