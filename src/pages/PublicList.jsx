import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const PublicList = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadPublicLists = async () => {
      if (!token) {
        setError("Debes iniciar sesión para ver las listas públicas");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:2000/api/lists/public", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => []);

        if (!res.ok) {
          setError(data.message || "No se pudieron cargar las listas públicas");
        } else {
          setLists(Array.isArray(data) ? data : []);
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    loadPublicLists();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        Cargando listas públicas…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-300">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1 mx-auto max-w-6xl px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Listas públicas</h1>

        {lists.length === 0 ? (
          <p className="text-gray-300">
            Todavía no hay listas públicas. Haz pública una de tus listas desde
            la página de detalles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lists.map((lista) => {
              // 👇 adapta aquí si tu back usa otro nombre
              const resenias = lista.resenias || lista.reviews || [];

            // DEBUG temporal:
             console.log("LISTA PUBLICA", lista.id_lista, resenias);

              // 1) Contar votos por miembro
              const votosPorMiembro = resenias.reduce((acc, r) => {
              const clave = (r.mejor_musico || "").trim();
             if (!clave) return acc;          // si viene vacío, lo ignoramos
             acc[clave] = (acc[clave] || 0) + 1;
             return acc;
              }, {});

            // 2) Buscar el miembro con más votos
            let miembroTop = null;
            let votosTop = 0;

            for (const [miembro, votos] of Object.entries(votosPorMiembro)) {
              if (votos > votosTop) {
                miembroTop = miembro;
                votosTop = votos;
              }
            }

            const totalResenias = resenias.length;
            const media =
              totalResenias > 0
                ? (
                    resenias.reduce(
                      (suma, r) => suma + (r.puntuacion || 0),
                      0
                    ) / totalResenias
                  ).toFixed(1)
                : null;

            // mejor_musico: preferimos el miembro con más votos; si no hay, tomamos el mejor_musico de la última reseña que lo tenga
            const mejorMusico =
              miembroTop ||
              resenias
                .slice()
                .reverse()
                .find((r) => r.mejor_musico)?.mejor_musico ||
              null;

              // últimas 2 reseñas para mostrar
              const ultimasResenias = resenias.slice(-2).reverse();

return (
  <article
    key={lista.id_lista}
    className="rounded-xl border border-white/10 bg-black/40 p-5 flex flex-col gap-3"
  >
                  {/* cabecera lista */}
                  <header className="flex justify-between items-start gap-3">
                    {miembroTop && (
                  <div className="mt-2 rounded-lg bg-pink-900/30 border border-pink-500/40 px-4 py-3">
                    {lista.nombre_lista}
                  <p className="text-xs text-pink-200 uppercase tracking-wide">
                    Miembro más votado
                  </p>
                   <p className="text-2xl font-extrabold text-pink-300">
                   {miembroTop}
                  </p>
                  <p className="text-xs text-pink-200 mt-1">
                  {votosTop} voto{votosTop !== 1 && "s"} en las reseñas
                   </p>
                  </div>
                  )}

                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {lista.nombre_lista}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Lista de{" "}
                        <span className="text-pink-400 font-medium">
                          {lista.propietario || "Usuario desconocido"}
                        </span>
                      </p>
                      {lista.creada_en && (
                        <p className="text-xs text-gray-500">
                          Creada el{" "}
                          {new Date(lista.creada_en).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* resumen reseñas */}
                    <div className="text-right text-xs">
                      {media ? (
                        <>
                          <p className="text-yellow-300 font-semibold">
                            {media}★
                          </p>
                          <p className="text-gray-400">
                            {totalResenias} reseña
                            {totalResenias !== 1 && "s"}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500">Sin reseñas aún</p>
                      )}
                    </div>
                  </header>

                  {/* mejor miembro */}
                  {mejorMusico && (
                    <p className="text-xs text-gray-300">
                      Mejor miembro de la banda:{" "}
                      <span className="font-semibold text-pink-300">
                        {mejorMusico}
                      </span>
                    </p>
                  )}

                  {/* últimas reseñas */}
                  <section className="mt-1 border-t border-white/10 pt-2">
                    <h3 className="text-xs font-semibold text-gray-200 mb-1">
                      Últimas reseñas
                    </h3>
                    {ultimasResenias.length === 0 ? (
                      <p className="text-[11px] text-gray-500">
                        Sé el primero en opinar sobre esta lista.
                      </p>
                    ) : (
                      <ul className="space-y-1 max-h-24 overflow-y-auto pr-1">
                        {ultimasResenias.map((r) => (
                          <li
                            key={r.id_resenia}
                            className="text-[11px] rounded-md bg-gray-900/60 px-3 py-2 border border-white/5"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-pink-300 font-medium">
                                {r.autor || "Anónimo"}
                              </span>
                              <span className="text-yellow-300">
                                {(r.puntuacion || 0) + "★"}
                              </span>
                            </div>
                            {r.comentario && (
                              <p className="mt-1 text-gray-300 line-clamp-2">
                                {r.comentario}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* botón ver / comentar */}
                  <div className="mt-3 flex justify-end">
                    <Link
                      to={`/playlist/${lista.id_lista}`}
                      className="text-xs rounded-full bg-pink-600 px-4 py-1 font-semibold text-white hover:bg-pink-500"
                    >
                      Ver lista y comentar
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

/*import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const PublicList = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPublicLists = async () => {
      if (!token) {
        setError("Debes iniciar sesión para ver las listas públicas");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:2000/api/lists/public", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => []);

        if (!res.ok) {
          setError(data.message || "No se pudieron cargar las listas públicas");
        } else {
          setLists(Array.isArray(data) ? data : []);
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicLists();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        Cargando listas públicas…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-300">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Listas públicas</h1>

        {lists.length === 0 ? (
          <p className="text-gray-300">
            Todavía no hay listas públicas. Anímate a hacer alguna de tus listas
            pública desde la página de detalles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lists.map((lista) => {
              const resenias = lista.resenias || lista.reviews || []; // 👈 ajusta si tu back usa otro nombre

              return (
                <article
                  key={lista.id_lista}
                  className="rounded-xl border border-white/10 bg-black/40 p-5 flex flex-col gap-3"
                >
                  <header className="flex justify-between items-start gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {lista.nombre_lista}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Creada por{" "}
                        <span className="text-pink-400 font-medium">
                          {lista.propietario || "Usuario desconocido"}
                        </span>
                      </p>
                      {lista.creada_en && (
                        <p className="text-xs text-gray-500">
                          Fecha:{" "}
                          {new Date(lista.creada_en).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </header>*/

                  {/* Reseñas */}
                  /*<section className="mt-2 border-t border-white/10 pt-2">
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">
                      Reseñas
                    </h3>

                    {resenias.length === 0 ? (
                      <p className="text-xs text-gray-500">
                        Aún no hay reseñas para esta lista.
                      </p>
                    ) : (
                      <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {resenias.map((r) => (
                          <li
                            key={r.id_resenia}
                            className="text-xs rounded-lg bg-gray-900/60 px-3 py-2 border border-white/5"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-pink-300 font-medium">
                                {r.usuario || "Anonimo"}
                              </span>
                              <span className="text-yellow-300">
                                {r.puntuacion}★
                              </span>
                            </div>
                            {r.mejor_musico && (
                              <p className="mt-1 text-[11px] text-gray-300">
                                Mejor músico:{" "}
                                <span className="font-medium">
                                  {r.mejor_musico}
                                </span>
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

/*import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export const PublicList = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPublicLists = async () => {
      if (!token) {
        setError("Debes iniciar sesión para ver las listas públicas");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:2000/api/lists/public", {
  headers: { Authorization: `Bearer ${token}` },
});

   
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          setError(data.message || "No se pudieron cargar las listas públicas");
        } else {
          setLists(data);
        }
      } catch {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicLists();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100">
        Cargando listas públicas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-300">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold">Listas públicas</h1>

        {lists.length === 0 ? (
          <p className="text-gray-300">
            Aún no hay listas públicas creadas por otros usuarios.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lists.map((l) => (
              <li
                key={l.id_lista}
                className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-pink-500/40 transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {l.nombre_lista}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Creador: {l.nombre_usuario} {l.apellidos_usuario}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {l.num_elementos} elementos
                </p>
                {l.creada_en && (
                  <p className="text-xs text-gray-500 mt-2">
                    Creada el {new Date(l.creada_en).toLocaleDateString()}
                  </p>
                )}
                {/* Más adelante: botón para ver detalles públicos, reseñas, etc. */
              /*</li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};*/
