// src/components/Footer.jsx
import logo from "../assets/logo-baul.png";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-pink-500 text-gray-300">   
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Izquierda: logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="El Baúl de la Música"
              className="h-8 w-8 rounded"
            />
            <span className="sr-only">El Baúl de la Música</span>
          </div>

          {/* Centro: lema con icono de baúl */}
          <div className="flex items-center gap-2 text-center">
            {/* Icono baúl (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 text-pink-400"
              fill="currentColor"
            >
              <path d="M3 7a2 2 0 0 1 2-2h3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3h3a2 2 0 0 1 2 2v3H3V7zm0 5h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5zm8.5 2a.5.5 0 0 0-.5.5v1h2v-1a.5.5 0 0 0-.5-.5h-1z" />
            </svg>
            <p className="text-sm sm:text-base tracking-wide">
              <span className="text-white">Tu colección,</span> tu historia musical.
            </p>
          </div>

          {/* Derecha: iconos sociales + contacto */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-4">
              {/* Icono GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-pink-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.09 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .85-.28 2.78 1.05a9.3 9.3 0 0 1 5.06 0c1.93-1.33 2.78-1.05 2.78-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.96-2.34 4.82-4.57 5.08.36.32.67.94.67 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
              {/* Icono Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2zM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
                </svg>
              </a>
              {/* Icono X/Twitter */}
              <a
                href="#"
                aria-label="X"
                className="hover:text-pink-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 3h5.2l3.5 5 3.9-5H20l-6.3 8.2L20.2 21h-5.2l-4-5.8L5.4 21H3.8l6.8-8.9L4 3z" />
                </svg>
              </a>
            </div>

            {/* Contacto */}
            <a
              href="tel:680180126"
              className="text-sm text-gray-400 hover:text-pink-400 transition"
            >
              Contacto: 680 180 126
            </a>
          </div>
        </div>

        {/* Línea inferior: año y autor */}
        <div className="mt-6 text-center text-xs text-gray-400">
          © {year} El Baúl de la Música — Desarrollado por Marceliano
        </div>
      </div>
    </footer>
  );
};

/*export const Footer = () => {
    return (
        <div class="bg-blue-300 p-2">
            Contactanos en Facebook
        </div>
    )
}*/