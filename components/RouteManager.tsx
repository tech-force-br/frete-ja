"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import RouteCard from '@/components/RouteCard';
import AddRouteModal from '@/components/AddRouteModal';
import { useLocalStorageRoutes } from '@/hooks/useLocalStorageRoutes';
import { Route } from '@/types';

interface MyRoutesProps {
  currentUser: string;
}

export default function MyRoutes({ currentUser }: MyRoutesProps) {
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  }

  const deleteMyRoute = (id: number) => {
    if (!confirm("Excluir esta rota permanentemente?")) return;

    const updatedRoutes = allRoutes.filter((r) => r.id !== id);
    saveToLocalStorage(updatedRoutes);
  };

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
              onContact={() => {}}
              onDelete={deleteMyRoute}
              isMyRoute={true}
            />
          ))
        )}
      </div>

      {/* Add Route Modal */}
      <AddRouteModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSave={saveNewRoute}
      />
    </div>
  );
}