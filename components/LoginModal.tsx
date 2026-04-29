"use client";

import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useState, useRef } from "react";
import { useModalClose } from "@/hooks/useModalClose";
import { isValidCPF, isValidCNPJ } from "@/utils/documentValidator";
import OTPInput from "@/components/OTPInput";
import { ModalMode } from "@/types/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (company: string) => void;
}
type SignupStep = "form" | "verify" | "password";
type ForgotStep = "form" | "sent";

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

  // Password reset
  const [forgotStep, setForgotStep] = useState<ForgotStep>("form");
  const [resetEmail, setResetEmail] = useState("");

  // Signup fields
  const [cnpj, setCNPJState] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCPFState] = useState("");
  const [ddd, setDDD] = useState("");
  const [phone, setPhoneState] = useState("");

  // Signup steps
  const [signupStep, setSignupStep] = useState<SignupStep>("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setSignupStep("form");
    setResetEmail("");
    setForgotStep("form")
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

  const switchToLogin = () => {
    setMode("login");
    resetForm();
  };

  const switchToForgotPassword = () => {
    setMode("forgot");
    setError("");
  };

  const switchToSignup = () => {
    setMode("signup");
    resetForm();
  };

  const handleResetPassword = () => {
    if (!resetEmail.trim()) {
      setError("Digite seu email.");
      return;
    }

    if (!validateEmailFormat(resetEmail)) {
      setError("Informe um e-mail válido.");
      return;
    }

    setError("");
    setForgotStep("sent");
  };

  const validateEmailFormat = (emailToValidate: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(emailToValidate);
  }

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
      if (!validateEmailFormat(corporateEmail)) {
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

    // simulate sending email
    console.log("Verification code sent to:", corporateEmail);

    // go to verification step
    setSignupStep("verify");
  };

  const handleBackStep = () => {
    if (signupStep === "verify") {
      setSignupStep("form");
      setError("");
    } else if (signupStep === "password") {
      setSignupStep("verify");
      setError("");
    } else if (forgotStep === "sent") {
      console.log('sent');
      setForgotStep("form");
      setError("");
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      setError("Digite o código de 6 dígitos.");
      return;
    }

    if (verificationCode !== "123456") {
      setError("Código inválido. Use 123456 para teste.");
      return;
    }

    setError("");
    setSignupStep("password");
  };

  const handleCreatePassword = () => {
    if (
      !passwordRules.length ||
      !passwordRules.upperLower ||
      !passwordRules.number
    ) {
      setError("Sua senha não atende aos requisitos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");

    alert("Conta criada com sucesso!");
    switchToLogin();
    onClose();
    onSuccessLogin(cnpj);
  };

  const passwordRules = {
    length: newPassword.length >= 8,
    upperLower: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
  };

  const hasStartedTypingPassword = newPassword.length > 0;

  const RequirementRow = ({
    valid,
    startedTyping,
    text,
  }: {
    valid: boolean;
    startedTyping: boolean;
    text: string;
  }) => {

    let icon = (
      <CheckCircle2 className="w-5 h-5 text-gray-300" />
    );

    if (startedTyping && !valid) {
      icon = <XCircle className="w-5 h-5 text-red-500" />;
    }

    if (valid) {
      icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }

    return (
      <div className="flex items-center gap-2 text-sm">
        {icon}
        <span className={valid ? "text-gray-700" : "text-gray-500"}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-3">
            {mode === "signup" && signupStep === "verify" || forgotStep === "sent" ? (
              <button
                onClick={handleBackStep}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            ) : null}

            <h3 className="text-2xl font-bold mb-1">
              {mode === "login" && "Entrar como Empresa"}

              {mode === "signup" && signupStep === "form" && "Criar Conta"}
              {mode === "signup" && signupStep === "verify" && "Verifique seu Email"}
              {mode === "signup" && signupStep === "password" && "Crie sua Senha"}

              {mode === "forgot" && forgotStep === "form" && "Recuperar Senha"}
              {mode === "forgot" && forgotStep === "sent" && "Email Enviado"}
            </h3>
          </div>

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
                  onClick={switchToForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>
          )}

          {/* ==================== FORGOT PASSWORD ==================== */}
          {mode === "forgot" && forgotStep === "form" && (
            <div className="mt-8 space-y-5">
              <p className="text-sm text-gray-500">
                Informe seu email e enviaremos um link para redefinir sua senha.
              </p>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="exemplo@empresa.com"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* ==================== EMAIL SENT SUCCESS ==================== */}
          {mode === "forgot" && forgotStep === "sent" && (
            <div className="mt-8 mb-6 text-center space-y-6">

              {/* Success icon */}
              <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-green-600" />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Verifique seu email</h4>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Enviamos um link de recuperação para
                  <br />
                  <span className="font-medium text-gray-700">{resetEmail}</span>
                </p>

                <p className="text-sm text-gray-500">
                  Abra seu email e clique no link para criar uma nova senha.
                  <br />
                  O link expira em alguns minutos.
                </p>
              </div>
            </div>
          )}

          {/* ==================== SIGNUP FORM ==================== */}
          {mode === "signup" && signupStep === "form" && (
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

          {/* ==================== CODE VERIFICATION ==================== */}
          {mode === "signup" && signupStep === "verify" && (
            <div className="mt-8 space-y-5 text-center">
              <p className="text-gray-500 text-sm">
                Enviamos um código de verificação para
                <br />
                <span className="font-medium">{corporateEmail}</span>
              </p>

              <OTPInput
                value={verificationCode}
                onChange={setVerificationCode}
              />

              <button
                onClick={() => alert("Reenviar email em breve")}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Reenviar código
              </button>
            </div>
          )}

          {/* ==================== PASSWORD CREATION ==================== */}
          {mode === "signup" && signupStep === "password" && (
            <>
              <div className="mt-8 space-y-5">
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    {showNewPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar senha"
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {/* PASSWORD REQUIREMENTS */}
              <div className="space-y-2 mt-8">
                <p className="text-sm font-medium text-gray-700">
                  Sua senha deve:
                </p>

                <RequirementRow
                  valid={passwordRules.length}
                  startedTyping={hasStartedTypingPassword}
                  text="Ter mais de 8 caracteres"
                />

                <RequirementRow
                  valid={passwordRules.upperLower}
                  startedTyping={hasStartedTypingPassword}
                  text="Conter letra maiúscula e minúscula"
                />

                <RequirementRow
                  valid={passwordRules.number}
                  startedTyping={hasStartedTypingPassword}
                  text="Conter um número"
                />
              </div>
            </>
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
            onClick={() => {
              if (mode === "login") return handleLogin();
              if (mode === "forgot") return handleResetPassword();
              if (signupStep === "form") return handleSignUp();
              if (signupStep === "verify") return handleVerifyCode();
              if (signupStep === "password") return handleCreatePassword();
            }}
            className="flex-1 py-5 bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          >
            {mode === "login"
              ? "Entrar"
              : mode === "forgot" && forgotStep === "form"
              ? "Enviar link"
              : mode === "forgot" && forgotStep === "sent"
              ? "Reenviar email"
              : signupStep === "form"
              ? "Cadastrar"
              : signupStep === "verify"
              ? "Verificar código"
              : "Criar senha"}
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