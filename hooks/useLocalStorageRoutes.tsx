"use client";

import { useState, useEffect } from 'react';
import { Route } from '@/types/route';

const STORAGE_KEY = 'minhas-rotas';

export function useLocalStorageRoutes(currentUser: string) {
  const [myRoutes, setMyRoutes] = useState<Route[]>([]);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Route[] = JSON.parse(saved);
        // Optional: filter by currentUser if you want to isolate per user
        // const userRoutes = parsed.filter(r => r.company === currentUser);
        setMyRoutes(parsed);
      } catch (e) {
        console.error('Failed to parse routes from localStorage', e);
      }
    }
  }, [currentUser]); // re-load if user changes (rare)

  const saveToLocalStorage = (routes: Route[]) => {
    setMyRoutes(routes);                    // ← This triggers re-render
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
    }
  };

  return { myRoutes, saveToLocalStorage };
}