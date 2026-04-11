"use client";

import { Truck, LogOut, LogIn } from "lucide-react";
import { useState } from "react";

type Page = "home" | "my-routes";

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  currentPage,
  onPageChange,
  isLoggedIn,
  onLogin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-3xl text-blue-600">
            <Truck size={36} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-700">
              FreteJá
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Rotas de Carga Brasil</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {/* Início Button */}
          <button
            onClick={() => onPageChange("home")}
            className={`nav-link px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer ${
              currentPage === "home" ? "active bg-gray-100" : ""
            }`}
          >
            Início
          </button>

          {/* Minhas Rotas Button - only show when logged in */}
          {isLoggedIn && (
            <button
              onClick={() => onPageChange("my-routes")}
              className={`nav-link px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer ${
                currentPage === "my-routes" ? "active bg-gray-100" : ""
              }`}
            >
              Minhas Rotas
            </button>
          )}

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 font-medium px-4 py-2 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut size={18} />
              Sair
            </button>
          )}

          {/* Login Button - only show when NOT logged in */}
          {!isLoggedIn && (
            <button
              onClick={onLogin}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogIn size={18} />
              <span>Entrar</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}