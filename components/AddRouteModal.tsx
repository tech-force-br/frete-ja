"use client";

import { useState } from "react";
import { Route } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (route: Omit<Route, "id" | "company">) => void;
}

export default function AddRouteModal({ isOpen, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    originState: "",
    originCity: "",
    destState: "",
    destCity: "",
    price: "",
    contact: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      originCity: form.originCity,
      originState: form.originState,
      destCity: form.destCity,
      destState: form.destState,
      price: Number(form.price),
      contact: form.contact,
    });

    // reset form
    setForm({
      originState: "",
      originCity: "",
      destState: "",
      destCity: "",
      price: "",
      contact: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">

        <form onSubmit={handleSubmit}>
          <div className="px-8 pt-8 pb-2">
            <h3 className="text-2xl font-bold mb-6">Nova Rota de Carga</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* ORIGIN STATE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Origem - Estado
                </label>
                <input
                  value={form.originState}
                  onChange={(e) => handleChange("originState", e.target.value)}
                  placeholder="Ex: SC"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  required
                />
              </div>

              {/* ORIGIN CITY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Origem - Cidade
                </label>
                <input
                  value={form.originCity}
                  onChange={(e) => handleChange("originCity", e.target.value)}
                  placeholder="Ex: Blumenau"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  required
                />
              </div>

              {/* DEST STATE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino - Estado
                </label>
                <input
                  value={form.destState}
                  onChange={(e) => handleChange("destState", e.target.value)}
                  placeholder="Ex: PR"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  required
                />
              </div>

              {/* DEST CITY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino - Cidade
                </label>
                <input
                  value={form.destCity}
                  onChange={(e) => handleChange("destCity", e.target.value)}
                  placeholder="Ex: Curitiba"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                  required
                />
              </div>
            </div>

            {/* PRICE */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="2500"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                required
              />
            </div>

            {/* CONTACT */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Contato
              </label>
              <input
                value={form.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="(47) 99999-9999 ou email@empresa.com"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                required
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex border-t px-8 py-6 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-gray-600 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 cursor-pointer"
            >
              Salvar Rota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}