"use client";

import { useState, useEffect } from "react";
import { Route } from "@/types/route";
import { states } from "@/lib/states";

interface Props {
  isOpen: boolean;
  route: Route | null;
  onClose: () => void;
  onSave: (route: Omit<Route, "company">) => void;
}

export default function AddRouteModal({ isOpen, route, onClose, onSave }: Props) {

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: 0,
    originState: "",
    originCity: "",
    destState: "",
    destCity: "",
    price: 0,
    contactInfo: {
      whatsapp: "",
      landline: "",
      email: ""
    },
  });

  useEffect(() => {

    const contactInfo = {
      whatsapp: route?.contactInfo?.whatsapp ?? "",
      landline: route?.contactInfo?.landline ?? "",
      email: route?.contactInfo?.email ?? "",
    }

    setForm({
      id: route?.id ?? 0,
      originState: route?.originState ?? "",
      originCity: route?.originCity ?? "",
      destState: route?.destState ?? "",
      destCity: route?.destCity ?? "",
      price: route?.price ?? 0,
      contactInfo: contactInfo
    });
  }, [route]);

  console.log('form', form);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => {

      if (field.includes('.')) {
        const [parent, child] = field.split('.');

        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof typeof prev] as any),
            [child]: value,
          },
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const { whatsapp, landline, email } = form.contactInfo;

    if (!whatsapp.trim() && !landline.trim() && !email.trim()) {
      setError("É obrigatório informar pelo menos um meio de contato (WhatsApp, Telefone ou Email).");
      return;
    }

    setError("");

    onSave({
      id: form.id !== 0 ? form.id : Date.now(),
      originCity: form.originCity,
      originState: form.originState,
      destCity: form.destCity,
      destState: form.destState,
      price: Number(form.price),
      contactInfo: form.contactInfo,
    });

    // reset form
    setForm({
      id: 0,
      originState: "",
      originCity: "",
      destState: "",
      destCity: "",
      price: 0,
      contactInfo: {
        whatsapp: "",
        landline: "",
        email: ""
      },
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
                <select
                  value={form.originState}
                  onChange={(e) => handleChange("originState", e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Todos os estados</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ORIGIN CITY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Origem - Cidade
                </label>
                <select
                  value={form.originCity}
                  onChange={(e) => handleChange("originCity", e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Todas as cidades</option>
                  {form.originState &&
                    states
                    .find((state) => state.code === form.originState)
                    ?.cities
                      .map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                    ))
                  }
                </select>
              </div>

              {/* DEST STATE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino - Estado
                </label>
                <select
                  value={form.destState}
                  onChange={(e) => handleChange("destState", e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Todos os estados</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DEST CITY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destino - Cidade
                </label>
                <select
                  value={form.destCity}
                  onChange={(e) => handleChange("destCity", e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Todas as cidades</option>
                  {form.destState &&
                    states
                    .find((state) => state.code === form.destState)
                    ?.cities
                      .map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                    ))
                  }
                </select>
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

            {/* WhatsApp */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                WhatsApp
              </label>
              <input
                value={form.contactInfo.whatsapp}
                onChange={(e) => handleChange("contactInfo.whatsapp", e.target.value)}
                placeholder="(47) 99999-9999"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>

            {/* Landline */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Telefone Fixo
              </label>
              <input
                value={form.contactInfo.landline}
                onChange={(e) => handleChange("contactInfo.landline", e.target.value)}
                placeholder="(47) 99999-9999"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>

            {/* Email */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                value={form.contactInfo.email}
                onChange={(e) => handleChange("contactInfo.email", e.target.value)}
                placeholder="email@empresa.com"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex border-t px-8 py-6 gap-3">
            <button
              type="button"
              onClick={() => {
                setError("");
                onClose();
              }}
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