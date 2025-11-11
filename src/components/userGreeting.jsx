// src/components/UserGreeting.jsx
import { useEffect, useState } from "react";

export const UserGreeting = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Recupera usuario desde localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserName(parsed.nombre || "");
      } catch {
        console.error("Error al leer usuario almacenado");
      }
    }
  }, []);

  if (!userName) return null; // si no hay usuario, no muestra nada

  return (
    <span className="text-sm text-gray-200 font-medium">
      👋 Bienvenido, <span className="text-pink-400">{userName}</span>
    </span>
  );
};
