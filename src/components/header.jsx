import { Link, NavLink } from "react-router-dom"; //moverte entre páginas sin
import logo from "../assets/logo-baul.png"; // cargar el logo
import { UserGreeting } from "./userGreeting";


export const Header = () => {
  const linkBase =
    "text-gray-200 hover:text-pink-400 transition font-medium";
  const linkActive = "text-pink-400";

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="h-20
         flex items-center justify-between">
          {/* Logo + nombre */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="El Baúl de la Música"
              className="h-10 w-10 rounded"
            />
            <span className="text-white text-lg font-semibold tracking-wide">
              El Baúl de la Música
            </span>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
              end
            >
              Inicio
            </NavLink>
            <NavLink
              to="/songs"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              Canciones
            </NavLink>
            <NavLink
              to="/playlist"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              Listas
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              Login
            </NavLink>
            <NavLink
              to="/listasPublicas"
              className={({ isActive }) => (isActive ? linkActive : linkBase)}
            >
              publicas
            </NavLink>
            
            <UserGreeting/>
          </nav>
        </div>
      </div>
    </header>
  );
};
