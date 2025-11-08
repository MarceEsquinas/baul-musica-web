// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina sesión
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirige al login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-pink-600 hover:text-white transition font-medium"
    >
      Cerrar sesión
    </button>
  );
};
