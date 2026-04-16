"use client";

import { useState } from "react";
import RouteCard from "@/components/RouteCard";
import ContactModal from "@/components/ContactModal";
import { Route } from "@/types/route";

type RouteListProps = {
  routes: Route[];
};

export default function RouteList({ routes }: RouteListProps) {

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);

  const openContactModal = (route: Route) => {
    setRoute(route);
    setIsContactModalOpen(true);
  }

  return (
    <>
      <div>
        {routes.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Nenhuma rota encontrada com os filtros aplicados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onContact={openContactModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {route ? (
        <ContactModal
          isOpen={isContactModalOpen}
          route={route}
          onClose={() => setIsContactModalOpen(false)}
        />
      ) : null}
    </>
  );
}