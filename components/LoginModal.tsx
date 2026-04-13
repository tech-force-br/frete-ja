"use client";

import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (company: string) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccessLogin,
}: LoginModalProps) {
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  function handleLogin() {
    if (!company.trim()) {
      alert("Digite o nome da empresa");
      return;
    }

    if (password !== "123") {
      alert("Senha incorreta! (use 123 para teste)");
      return;
    }

    onSuccessLogin(company);
    setCompany("");
    setPassword("");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <h3 className="text-2xl font-bold mb-1">Entrar como Empresa</h3>
          <p className="text-gray-500">Acesse sua conta para gerenciar rotas</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome da Empresa
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Transportes ABC"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Senha de teste: <span className="font-mono">123</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex border-t">
          <button
            onClick={onClose}
            className="flex-1 py-5 text-gray-600 font-medium hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleLogin}
            className="flex-1 py-5 bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}