"use client";

import { states } from "@/lib/states";

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
      {/* ORIGIN STATE */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Origem - Estado
        </label>
        <select
          value={originState}
          onChange={(e) => setOriginState(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
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
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Origem - Cidade
        </label>
        <select
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
        >
          <option value="">Todas as cidades</option>
          {originState &&
            states
            .find((state) => state.code === originState)
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
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Destino - Estado
        </label>
        <select
          value={destState}
          onChange={(e) => setDestState(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
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
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Destino - Cidade
        </label>
        <select
          value={destCity}
          onChange={(e) => setDestCity(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
        >
          <option value="">Todas as cidades</option>
          {destState &&
            states
            .find((state) => state.code === destState)
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
  );
}