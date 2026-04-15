"use client";

import { Route } from "@/types";

interface Props {
  isOpen: boolean;
  route: Route;
  onClose: () => void;
}

export default function ContactModal({ isOpen, route, onClose }: Props) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">


        <div className="px-8 pt-8 pb-2">
          <h3 className="text-2xl font-bold mb-6">Contatos da Transportadora</h3>

          {/* CONTACT */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Contato
            </label>
            <input
              value={route.contact}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              readOnly
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex border-t px-8 py-6 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-gray-600 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50 cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}