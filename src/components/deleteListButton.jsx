// src/components/DeleteListButton.jsx
export const DeleteListButton = ({ idLista, onDeleted }) => {
  const handleDelete = async () => {
    const ok = confirm("¿Seguro que quieres borrar esta lista?");
    if (!ok) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay sesión");
      return;
    }

    // Optimistic UI: avisa arriba para quitar de pantalla
    onDeleted?.(idLista);

    try {
      const res = await fetch(`http://localhost:2000/api/playlist/${idLista}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok && res.status !== 204) {
        throw new Error("Falló el borrado");
      }
    } catch {
      // revertir (vuelve a cargar desde servidor)
      alert("No se pudo borrar. Refrescando listas…");
      onDeleted?.(idLista, { revert: true });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-3 rounded-lg bg-red-600/80 px-3 py-1 text-sm text-white hover:bg-red-600 transition"
    >
      Eliminar lista
    </button>
  );
};
