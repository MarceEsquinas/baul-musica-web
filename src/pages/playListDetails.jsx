// src/pages/playListDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { AddItemToListForm } from "../components/addItemToListForm";

export const PlaylistDetail = () => {
  const { id } = useParams();              // /playlist/:id
  const navigate = useNavigate();

  const [listInfo, setListInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ⬇️ Cargar datos al entrar en la página
  useEffect(() => {
    console.log("useEffect PlaylistDetail: EMPIEZA");

    const fetchData = async () => {
      console.log("fetchData: EMPIEZA");

      if (!token) {
        console.log("fetchData: NO HAY TOKEN");
        setError("No hay sesión iniciada");
        setLoading(false);
        return;
      }

      try {
        const [rList, rItems] = await Promise.all([
          fetch(`http://localhost:2000/api/lists/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://localhost:2000/api/lists/${id}/items`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("fetchData: respuestas", rList.status, rItems.status);

        const [dList, dItems] = await Promise.all([
          rList.json().catch(() => ({})),
          rItems.json().catch(() => []),
        ]);

        if (!rList.ok) {
          setError(dList.message || "No se pudo cargar la lista");
          return;
        }

        setListInfo(dList);

        if (rItems.ok) {
          setItems(dItems);
        } else {
          setError(dItems.message || "No se pudo cargar los elementos");
        }
      } catch (e) {
        console.error("fetchData: ERROR", e);
        setError("Error de conexión con el servidor");
      } finally {
        console.log("fetchData: TERMINA → setLoading(false)");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  // ⬇️ cuando se añade algo desde el formulario, recargamos elementos
  const handleAdded = async () => {
    if (!token) return;

    try {
      const resItems = await fetch(
        `http://localhost:2000/api/lists/${id}/items`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dataItems = await resItems.json().catch(() => []);

      if (resItems.ok) {
        setItems(dataItems);
      }
    } catch (e) {
      console.error("handleAdded ERROR:", e);
    }
  };

  // ⬇️ eliminar un elemento de la lista
  const handleDelete = async (idElemento) => {
    if (!confirm("¿Seguro que quieres quitar este elemento de la lista?")) return;

    try {
      const res = await fetch(
        `http://localhost:2000/api/lists/${id}/items/${idElemento}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 204) {
        setItems((prev) =>
          prev.filter((it) => it.id_elemento_lista !== idElemento)
        );
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "No se pudo eliminar el elemento");
      }
    } catch (e) {
      console.error("handleDelete ERROR:", e);
      alert("Error de conexión al eliminar");
    }
  };

  // ⬇️ pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
        Cargando lista...
      </div>
    );
  }

  // ⬇️ pantalla de error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-300">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  // ⬇️ pantalla normal
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10 space-y-6">
        <button
          onClick={() => navigate("/playlist")}
          className="text-sm text-gray-300 hover:text-pink-400 mb-2"
        >
          ← Volver a mis listas
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {listInfo?.nombre_lista || `Lista ${id}`}
          </h1>
          {listInfo?.creada_en && (
            <p className="text-sm text-gray-400">
              Creada el{" "}
              {new Date(listInfo.creada_en).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Formulario para añadir álbumes/canciones a esta lista */}
        <AddItemToListForm idLista={id} onAdded={handleAdded} />

        {/* Contenido de la lista */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Contenido de la lista</h2>

          {items.length === 0 ? (
            <p className="text-gray-300">
              Esta lista todavía no tiene elementos.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => {
                const esAlbum = it.id_album !== null;
                const nombre = esAlbum ? it.nombre_album : it.nombre_cancion;
                const tipo = esAlbum ? "Álbum" : "Canción";

                return (
                  <li
                    key={it.id_elemento_lista}
                    className="flex justify-between items-center rounded-lg border border-gray-700 bg-black/40 px-4 py-2"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {nombre || "(sin nombre)"}
                      </p>
                      <p className="text-xs text-gray-400">{tipo}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(it.id_elemento_lista)}
                      className="rounded bg-red-600/80 px-3 py-1 text-xs text-white hover:bg-red-600"
                    >
                      Quitar
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};
