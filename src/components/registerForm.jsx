import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    correo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(form.correo)) {
      setError("Correo no válido");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "No se pudo registrar");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/playlist");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}       //valida los datos y los envia al servidor
      className="w-full max-w-md space-y-4 rounded-xl bg-gray-900 p-6 text-gray-100"
    >
      <h2 className="text-center text-2xl font-bold text-pink-500">Crear cuenta</h2>

      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input name="nombre" value={form.nombre} onChange={onChange}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none" required />
      </div>

      <div>
        <label className="block text-sm mb-1">Apellidos</label>
        <input name="apellidos" value={form.apellidos} onChange={onChange}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none" />
      </div>

      <div>
        <label className="block text-sm mb-1">DNI</label>
        <input name="dni" value={form.dni} onChange={onChange}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none" required />
      </div>

      <div>
        <label className="block text-sm mb-1">Correo</label>
        <input type="email" name="correo" value={form.correo} onChange={onChange}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none" required />
      </div>

      <div>
        <label className="block text-sm mb-1">Contraseña</label>
        <input type="password" name="password" value={form.password} onChange={onChange}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm focus:border-pink-500 focus:outline-none" required />
      </div>

      {error && <p className="text-sm text-red-400 text-center bg-red-900/30 rounded p-2">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full rounded-lg bg-pink-600 py-2 font-semibold text-white hover:bg-pink-500 transition disabled:opacity-50">
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
};
