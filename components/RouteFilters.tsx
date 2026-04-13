"use client";

import { states } from "@/lib/data";

interface RouteFiltersProps {
  originState: string;
  setOriginState: (value: string) => void;
  originCity: string;
  setOriginCity: (value: string) => void;
  destState: string;
  setDestState: (value: string) => void;
  destCity: string;
  setDestCity: (value: string) => void;
};

export default function RouteFilters({
  originState,
  setOriginState,
  originCity,
  setOriginCity,
  destState,
  setDestState,
  destCity,
  setDestCity,
}: RouteFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Estado de Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Estado de Origem
        </label>
        <select
          value={originState}
          onChange={(e) => setOriginState(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="">Todos os estados</option>
          {states.map((state) => (
            <option key={state.uf} value={state.uf}>
              {state.uf} - {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cidade de Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Cidade de Origem
        </label>
        <input
          type="text"
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
          placeholder="Ex: São Paulo"
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Estado de Destino */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Estado de Destino
        </label>
        <select
          value={destState}
          onChange={(e) => setDestState(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="">Todos os estados</option>
          {states.map((state) => (
            <option key={state.uf} value={state.uf}>
              {state.uf} - {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cidade de Destino */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Cidade de Destino
        </label>
        <input
          type="text"
          value={destCity}
          onChange={(e) => setDestCity(e.target.value)}
          placeholder="Ex: Rio de Janeiro"
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}