"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  function handleLogin() {
    setShowLoginModal(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    router.push("/");
  }

  function handleLoginSuccess(company: string) {
    setIsLoggedIn(true);
    setShowLoginModal(false);

    router.push("/minhas-rotas");

    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl";
    toast.innerHTML = `✅ Bem-vindo, <strong>${company}</strong>!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccessLogin={handleLoginSuccess}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}