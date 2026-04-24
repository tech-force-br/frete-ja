"use client";

import { useRef } from "react";
import { useModalClose } from "@/hooks/useModalClose";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ isOpen, onClose, onDelete }: Props) {

  const modalRef = useRef<HTMLDivElement>(null);

  useModalClose(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">

        <div className="px-8 pt-8 pb-2">
          <h3 className="text-2xl font-bold mb-6">Você tem certeza que quer deletar esta rota?</h3>
        </div>

        {/* BUTTONS */}
        <div className="flex border-t px-8 py-6 gap-3">
        <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-gray-600 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50 cursor-pointer"
        >
            Cancelar
        </button>

        <button
            type="button"
            onClick={onDelete}
            className="flex-1 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 cursor-pointer"
        >
            Deletar Rota
        </button>
        </div>
      </div>
    </div>
  );
}