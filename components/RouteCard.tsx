import { Phone } from "lucide-react";
import { Route } from "@/types";

interface Props {
  route: Route;
  onContact: (route: Route) => void;
}

export default function RouteCard({ route, onContact }: Props) {
  return (
    <div className="route-card bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
      <div className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{route.originState}</span>
              <span className="text-xs">→</span>
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{route.destState}</span>
            </div>
            <div className="mt-3">
              <p className="text-xl font-semibold">{route.originCity}</p>
              <p className="text-xl font-semibold text-gray-600">{route.destCity}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-600">R$ {route.price}</p>
            <p className="text-xs text-gray-500 mt-1">por viagem</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-5 border-t flex items-center justify-between">
        <div>
          <p className="font-medium">{route.company}</p>
          <p className="text-xs text-gray-500">{route.contact}</p>
        </div>
        <button
          onClick={() => onContact(route)}
          className="bg-white border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Phone size={18} />
          Contatar
        </button>
      </div>
    </div>
  );
}