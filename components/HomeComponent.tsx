"use client";

import { useState, useMemo } from "react";
import RouteList from "@/components/RouteList";
import RouteFilters from "@/components/RouteFilters";

import { initialRoutes } from "@/lib/mockedRoutes";

export default function Home() {
  const [originState, setOriginState] = useState("");
  const [originCity, setOriginCity] = useState("");
  const [destState, setDestState] = useState("");
  const [destCity, setDestCity] = useState("");

  const filteredRoutes = useMemo(() => {

    return initialRoutes.filter((route) => {
      const matchesOriginState = !originState || route.originState === originState;

      const matchesOriginCity =
        !originCity ||
        route.originCity.toLowerCase().includes(originCity.toLowerCase());

      const matchesDestState = !destState || route.destState === destState;
      const matchesDestCity =
        !destCity ||
        route.destCity.toLowerCase().includes(destCity.toLowerCase());

      return matchesOriginState && matchesOriginCity && matchesDestState && matchesDestCity;
    });
  }, [originState, originCity, destState, destCity]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Rotas de Carga Disponíveis</h2>
          <p className="text-gray-600 mt-2">Encontre fretes ou publique sua própria rota</p>
        </div>
      </div>

      <RouteFilters
        originState={originState}
        setOriginState={setOriginState}
        originCity={originCity}
        setOriginCity={setOriginCity}
        destState={destState}
        setDestState={setDestState}
        destCity={destCity}
        setDestCity={setDestCity}
      />

      <RouteList routes={filteredRoutes} />
    </main>
  );
}