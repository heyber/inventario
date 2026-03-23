"use client";

import { useState } from "react";
import InventoryModal from "./InventoryModal";

interface InventoryTableProps {
  inventories: any[];
  loading: boolean;
}

export default function InventoryTable({ inventories = [], loading }: InventoryTableProps) {
  const [selectedInventory, setSelectedInventory] = useState<any>(null);

  if (loading) return <p className="text-center py-4 text-gray-500">Cargando inventarios...</p>;
  if (!Array.isArray(inventories) || inventories.length === 0)
    return <p className="text-center py-4 text-gray-500">No hay inventarios cargados.</p>;

  return (
    <>
      <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-200 text-indigo-900 uppercase text-sm font-semibold">
          <tr>
            <th className="py-3 px-4 border">Código</th>
            <th className="py-3 px-4 border">Producto</th>
            <th className="py-3 px-4 border">Disponibilidad</th>
            <th className="py-3 px-4 border">Precio</th>
            <th className="py-3 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {(Array.isArray(inventories) ? inventories : []).map((inv) => (
            <tr key={inv.id} className="hover:bg-indigo-50 transition">
              <td className="py-2 px-4 border">{inv.codigo}</td>
              <td className="py-2 px-4 border">{inv.producto}</td>
              <td className="py-2 px-4 border">{inv.disponibilidad}</td>
              <td className="py-2 px-4 border">{inv.precio}</td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                  onClick={() => setSelectedInventory(inv)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInventory && (
        <InventoryModal
          inventory={selectedInventory}
          onClose={() => setSelectedInventory(null)}
        />
      )}
    </>
  );
}