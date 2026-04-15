"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import RouteCard from '@/components/RouteCard';
import AddRouteModal from '@/components/AddRouteModal';
import ContactModal from '@/components/ContactModal';
import DeleteModal from '@/components/DeleteModal';
import { useLocalStorageRoutes } from '@/hooks/useLocalStorageRoutes';
import { Route } from '@/types';

interface MyRoutesProps {
  currentUser: string;
}

export default function MyRoutes({ currentUser }: MyRoutesProps) {
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<Route | null>(null);
  const { allRoutes, myRoutes, saveToLocalStorage } = useLocalStorageRoutes(currentUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const saveNewRoute = (newRouteData: Omit<Route, 'id' | 'company'>) => {
    const newRoute: Route = {
      id: Date.now(),
      ...newRouteData,
      company: currentUser,
    };

    const updatedRoutes = [newRoute, ...myRoutes];
    saveToLocalStorage(updatedRoutes);

    setIsAddModalOpen(false);
  };

  const openAddRouteModal = () => {
    setIsAddModalOpen(true);
  }

  const closeAddRouteModal = () => {
    setIsAddModalOpen(false);
  }

  const openContactModal = (route: Route) => {
    setRoute(route);
    setIsContactModalOpen(true);
  }

  const deleteMyRoute = () => {
    setIsDeleteModalOpen(false);
    const updatedRoutes = allRoutes.filter((r) => r.id !== routeToDelete?.id);
    saveToLocalStorage(updatedRoutes);
  };

  const openDeleteModal = (route: Route) => {
    setRouteToDelete(route);
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Minhas Rotas</h2>
        <button
          onClick={openAddRouteModal}
          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-green-700 transition-all cursor-pointer"
        >
          <Plus size={20} />
          <span>Adicionar Nova Rota</span>
        </button>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRoutes.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-gray-400">
            <p>Você ainda não tem rotas cadastradas.</p>
          </div>
        ) : (
          myRoutes.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              onContact={openContactModal}
              onDelete={openDeleteModal}
              isMyRoute={true}
            />
          ))
        )}
      </div>

      {/* Add Route Modal */}
      <AddRouteModal
        isOpen={isAddModalOpen}
        onClose={closeAddRouteModal}
        onSave={saveNewRoute}
      />

      {/* Contact Modal */}
      {route ? (
        <ContactModal
          isOpen={isContactModalOpen}
          route={route}
          onClose={() => setIsContactModalOpen(false)}
        />
      ) : null}

      {/* Delete Modal */}
      {routeToDelete ? (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={deleteMyRoute}
        />
      ) : null}
      </div>
  );
}