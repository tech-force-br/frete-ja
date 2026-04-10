"use client";

import { useState } from "react";
import { Route } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (route: Omit<Route, "id">) => void;
  states: string[];
}

export default function AddRouteModal({ isOpen, onClose, onSave, states }: Props) {
  const [form, setForm] = useState({
    originCity: "", originState: "", destCity: "", destState: "",
    price: "", company: "Minha Empresa", contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      originCity: form.originCity,
      originState: form.originState,
      destCity: form.destCity,
      destState: form.destState,
      price: Number(form.price),
      company: form.company,
      contact: form.contact,
    });
    setForm({ originCity: "", originState: "", destCity: "", destState: "", price: "", company: "Minha Empresa", contact: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <h3 className="text-2xl font-bold mb-6">Nova Rota de Carga</h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose}
                className="flex-1 py-4 text-gray-600 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 py-4 bg-emerald-600 text-white font-semibold rounded-2xl hover:bg-emerald-700">
                Salvar Rota
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}