"use client";

import RouteCard from "@/components/RouteCard";
import type { Route } from "@/lib/data";

type RouteListProps = {
  routes: Route[];
};

export default function RouteList({ routes }: RouteListProps) {

  const contactCompany = (route: Route) => {
    alert(`✅ Contato com ${route.company}\n\n📞 ${route.contact}\n\n(Em produção: WhatsApp ou e-mail)`);
  };

  return (
    <div>
      {routes.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Nenhuma rota encontrada com os filtros aplicados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onContact={contactCompany}
            />
          ))}
        </div>
      )}
    </div>
  );
}