"use client";

import { useState, useEffect } from 'react';
import { Route } from '@/types';

const STORAGE_KEY = 'my-routes';

export function useLocalStorageRoutes(currentUser: string) {
  const [allRoutes, setAllRoutes] = useState<Route[]>(() => {
    // Initial load from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage
  const saveToLocalStorage = (routes: Route[]) => {
    setAllRoutes(routes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  };

  // Get only my routes (computed)
  const myRoutes = allRoutes.filter(
    (route) => route.company === currentUser
  );

  // Refresh from localStorage (useful if changed in another tab/component)
  const refreshRoutes = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAllRoutes(JSON.parse(saved));
    }
  };

  return {
    allRoutes,
    myRoutes,
    saveToLocalStorage,
    refreshRoutes,
  };
}