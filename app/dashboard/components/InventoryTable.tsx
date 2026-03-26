"use client";

import { useState } from "react";
import InventoryModal from "./InventoryModal";

interface InventoryTableProps {
  inventories: any[];
  loading: boolean;
}

export default function InventoryTable({ inventories, loading }: InventoryTableProps) {
  const [selectedInventory, setSelectedInventory] = useState<any>(null);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <p className="text-gray-800 font-medium">Cargando inventarios...</p>
      </div>
    );
  }

  if (!inventories || inventories.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <p className="text-gray-800 font-medium">No hay inventarios cargados</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Archivos de Inventario
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm">
          
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-4 py-3 text-left text-white font-semibold">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-white font-semibold">
                Descripción
              </th>
              <th className="px-4 py-3 text-left text-white font-semibold">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-white font-semibold">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {inventories.map((inv) => (
              <tr
                key={inv.id}
                className="border-b hover:bg-indigo-50 transition"
              >
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {inv.name}
                </td>

                <td className="px-4 py-3 text-gray-800">
                  {inv.description || "Sin descripción"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 flex gap-2">
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
                    onClick={() => setSelectedInventory(inv)}
                  >
                    Ver
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={async () => {
                      const confirmDelete = confirm("¿Eliminar este inventario?");
                      if (!confirmDelete) return;

                      try {
                        await fetch("/api/inventory-file/delete", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ id: inv.id }),
                        });

                        window.location.reload();
                      } catch (error) {
                        console.error("Error eliminando:", error);
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {selectedInventory && (
        <InventoryModal
          inventory={selectedInventory}
          onClose={() => setSelectedInventory(null)}
        />
      )}
    </div>
  );
}