"use client";

import { useState } from "react";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";

type Page = "home" | "my-routes";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [companyName, setCompanyName] = useState("");

  function handleLogin() {
    setShowLoginModal(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentPage("home");
  }

  function handlePageChange(page: Page) {
    setCurrentPage(page);
  }

  function handleLoginSuccess(company: string) {
    setCompanyName(company);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentPage("my-routes");

    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl";
    toast.innerHTML = `✅ Bem-vindo, <strong>${company}</strong>!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  return (
    <>
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccessLogin={handleLoginSuccess}
      />

      <main>{children}</main>
    </>
  );
}