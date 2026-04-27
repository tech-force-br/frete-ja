"use client";

import { useState, useRef } from "react";
import { useModalClose } from "@/hooks/useModalClose";
import { isValidCPF, isValidCNPJ } from "@/utils/documentValidator";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (company: string) => void;
}

type ModalMode = "login" | "signup";

export default function LoginModal({
  isOpen,
  onClose,
  onSuccessLogin,
}: LoginModalProps) {
  const [mode, setMode] = useState<ModalMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [cnpj, setCNPJState] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCPFState] = useState("");
  const [ddd, setDDD] = useState("");
  const [phone, setPhoneState] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setCnpj("");
    setCorporateEmail("");
    setFullName("");
    setCpf("");
    setPhone("");
    setDDD("");
    setShowPassword(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const resetMode = (value: ModalMode) => {
    setMode(value);
  }

  useModalClose(modalRef, onClose, isOpen, resetForm, resetMode, "login");

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const setCnpj = (value: string) => {
    setCNPJState(value.replace(/\D/g, "").slice(0, 14));
  };

  const setCpf = (value: string) => {
    setCPFState(value.replace(/\D/g, "").slice(0, 11));
  };

  const setPhone = (value: string) => {
    setPhoneState(value.replace(/\D/g, "").slice(0, 9));
  };

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Digite o email");
      return;
    }
    if (password !== "123") {
      alert("Senha incorreta! (use 123 para teste)");
      return;
    }

    onSuccessLogin(email);
    resetForm();
    onClose();
  };

  const handleSignUp = () => {

    if (
      !cnpj.trim() ||
      !corporateEmail.trim() ||
      !fullName.trim() ||
      !cpf.trim() ||
      !phone.trim()
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!isValidCNPJ(cnpj)) {
      setError("Informe um CNPJ válido.");
      return;
    }

    if (corporateEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailRegex.test(corporateEmail)) {
        setError("Informe um e-mail válido.");
        return;
      }
    }

    if (!isValidCPF(cpf)) {
      setError("Informe um CPF válido.");
      return;
    }

    if (phone.length < 8) {
      setError("Informe um número de celular válido.");
      return;
    }

    setError("");

    alert("Cadastro em desenvolvimento - Campos recebidos com sucesso!");
    console.log({
      cnpj,
      corporateEmail,
      fullName,
      cpf,
      ddd,
      phone,
    });

    switchToLogin();
    onClose();
  };

  const switchToLogin = () => {
    setMode("login");
    resetForm();
  };

  const switchToSignup = () => {
    setMode("signup");
    resetForm();
  };

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);

    if (digits.length <= 4) return digits;

    if (digits.length <= 8) {
      return digits.replace(/(\d{4})(\d+)/, "$1-$2");
    }

    return digits.replace(/(\d{5})(\d+)/, "$1-$2");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <h3 className="text-2xl font-bold mb-1">
            {mode === "login" ? "Entrar como Empresa" : "Criar Conta"}
          </h3>
          <p className="text-gray-500">
            {mode === "login"
              ? "Acesse sua conta para gerenciar rotas"
              : "Preencha os dados para cadastrar sua empresa"}
          </p>

          {/* ==================== LOGIN FORM ==================== */}
          {mode === "login" && (
            <div className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@empresa.com"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={() => alert("Recuperação de senha em desenvolvimento")}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>
          )}

          {/* ==================== SIGNUP FORM ==================== */}
          {mode === "signup" && (
            <div className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">CNPJ</label>
                <input
                  value={formatCNPJ(cnpj)}
                  onChange={(e) => setCnpj(e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Corporativo</label>
                <input
                  type="email"
                  value={corporateEmail}
                  onChange={(e) => setCorporateEmail(e.target.value)}
                  placeholder="contato@empresa.com"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="João Silva"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* CPF */}
              <div>
                <label className="block text-sm font-medium mb-1">CPF</label>
                <input
                  value={formatCPF(cpf)}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* CELULAR */}
              <div>
                <label className="block text-sm font-medium mb-1">Celular</label>

                <div className="flex gap-3">
                  {/* DDD */}
                  <input
                    value={ddd}
                    onChange={(e) => setDDD(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="DDD"
                    maxLength={2}
                    className="w-24 border border-gray-300 rounded-2xl px-3 py-4 text-center focus:outline-none focus:border-blue-500"
                  />

                  {/* Número */}
                  <input
                    value={formatPhone(phone)}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="99999-5555"
                    className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm text-center">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex border-t">
          <button
            onClick={() => {
                onClose();
                setMode("login");
              }
            }
            className="flex-1 py-5 text-gray-600 font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={mode === "login" ? handleLogin : handleSignUp}
            className="flex-1 py-5 bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          >
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </div>

        {/* Footer Link */}
        <div className="px-8 py-6 border-t bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Não tem uma conta?{" "}
                <button
                  onClick={switchToSignup}
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Cadastre-se agora
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Faça login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}