"use client";

import { useState, useEffect } from "react";
import RouteCard from "@/components/RouteCard";
import AddRouteModal from "@/components/AddRouteModal";
import { Truck, Plus } from "lucide-react";

interface Route {
  id: number;
  originCity: string;
  originState: string;
  destCity: string;
  destState: string;
  price: number;
  company: string;
  contact: string;
}

const initialRoutes: Route[] = [
  { id: 1, originCity: "São Paulo", originState: "SP", destCity: "Rio de Janeiro", destState: "RJ", price: 3200, company: "Transportes Rapido", contact: "(11) 98765-4321" },
  { id: 2, originCity: "Blumenau", originState: "SC", destCity: "Curitiba", destState: "PR", price: 1800, company: "Carga Sul", contact: "carga@sul.com.br" },
  { id: 3, originCity: "Belo Horizonte", originState: "MG", destCity: "Brasília", destState: "DF", price: 4500, company: "Minas Log", contact: "(31) 99988-7766" },
  { id: 4, originCity: "Porto Alegre", originState: "RS", destCity: "Florianópolis", destState: "SC", price: 2200, company: "Transportes Rapido", contact: "(11) 98765-4321" },
  { id: 5, originCity: "Salvador", originState: "BA", destCity: "Recife", destState: "PE", price: 3800, company: "Nordeste Cargas", contact: "(71) 98877-6655" },
];

const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [showAddModal, setShowAddModal] = useState(false);

  const contactCompany = (route: Route) => {
    alert(`✅ Contato com ${route.company}\n\n📞 ${route.contact}\n\n(Em produção: WhatsApp ou e-mail)`);
  };

  const addNewRoute = (newRoute: Omit<Route, "id">) => {
    const route: Route = { ...newRoute, id: Date.now() };
    setRoutes([...routes, route]);
    setShowAddModal(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Rotas de Carga Disponíveis</h2>
          <p className="text-gray-600 mt-2">Encontre fretes ou publique sua própria rota</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all active:scale-95"
        >
          <Plus size={20} />
          Publicar Nova Rota
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} onContact={contactCompany} />
        ))}
      </div>

      <AddRouteModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={addNewRoute}
        states={states}
      />
    </main>
  );
}