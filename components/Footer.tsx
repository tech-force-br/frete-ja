"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FreteJá - Rotas de Carga Brasil
          </div>

          <a
            href="https://chat.whatsapp.com/GTNBnkD74NPLrXh8snQ7bm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <img
              src={"/whatsapp-icon-32.png"}
              alt="WhatsApp"
              className="w-5 h-5"
            />
            Fale conosco no WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}