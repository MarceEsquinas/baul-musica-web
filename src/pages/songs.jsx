import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CreateSongForm } from "../components/createSongForm";
import { CreateAlbumForm } from "../components/createAlbumForm";
import { AddSongToAlbumForm } from "../components/addSongToAlbumForm";
import { useState } from "react";

export const Songs = () => {
  const [flash, setFlash] = useState("");

  const onSongCreated  = () => setFlash("Canción creada ✅");
  const onAlbumCreated = () => setFlash("Álbum creado ✅");
  const onLinked       = () => setFlash("Canción vinculada al álbum ✅");

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10 space-y-8">
        <h1 className="text-2xl font-bold">Canciones</h1>
        {flash && <div className="rounded bg-green-600/20 border border-green-600/30 p-3 text-green-300">{flash}</div>}

        {/* 1) Crear canción */}
        <CreateSongForm onCreated={onSongCreated} />

        {/* 2) Crear álbum */}
        <CreateAlbumForm onCreated={onAlbumCreated} />

        {/* 3) Asociar canción a álbum */}
        <AddSongToAlbumForm onLinked={onLinked} />
      </main>
      <Footer />
    </div>
  );
};
