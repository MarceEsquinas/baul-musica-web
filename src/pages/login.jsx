// src/pages/login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Si ya está logueado, redirige directamente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/playlist");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Guardar token y redirigir
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/playlist");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-xl bg-gray-900 p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-pink-500">
          Iniciar sesión
        </h2>

        <div>
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center bg-red-900/30 rounded p-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-pink-600 py-2 font-semibold text-white hover:bg-pink-500 transition disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-pink-400 hover:text-pink-300 font-medium"
          >
            Crear cuenta
          </a>
        </p>
      </form>
    </div>
  );
};

/*import{Header} from "../components/header"
export const Login = () => {
    return (
       
      <form>
         
         
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <p>Gracias por tu colaboracion</p>
        </form>
        
    )
}*/