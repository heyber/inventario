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
      <div className="inventory-table-container">
        <p className="text-gray-800 font-medium">Cargando inventarios...</p>
      </div>
    );
  }

  if (!inventories || inventories.length === 0) {
    return (
      <div className="inventory-table-container">
        <p className="text-gray-800 font-medium">No hay inventarios cargados</p>
      </div>
    );
  }

  return (
    <div className="inventory-table-container">
      <h2 className="inventory-table-title">Archivos de Inventario</h2>

      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          
          <thead className="inventory-table-header">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody className="inventory-table-body">
            {inventories.map((inv) => {
              let parsedData = inv.data;
              try {
                if (typeof parsedData === "string") {
                  parsedData = JSON.parse(parsedData);
                }
              } catch {
                parsedData = [];
              }

              return (
                <tr key={inv.id}>
                  <td className="name">{inv.name}</td>
                  <td className="description">{inv.description || "Sin descripción"}</td>
                  <td className="date">{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">

                    <button
                      className="btn btn-view"
                      onClick={() => setSelectedInventory({ ...inv, data: parsedData })}
                    >
                      Ver
                    </button>

                    <button
                      className="btn btn-export"
                      onClick={() => {
                        import("xlsx").then((XLSX) => {
                          const workbook = XLSX.utils.book_new();

                          if (inv.type === "multi" && parsedData?.sheets) {
                            parsedData.sheets.forEach((sheet: any) => {
                              const ws = XLSX.utils.json_to_sheet(sheet.data || []);
                              XLSX.utils.book_append_sheet(workbook, ws, sheet.name || "Sheet");
                            });
                          } else {
                            const ws = XLSX.utils.json_to_sheet(parsedData || []);
                            XLSX.utils.book_append_sheet(workbook, ws, "Inventario");
                          }

                          XLSX.writeFile(workbook, `${inv.name || "inventario"}.xlsx`);
                        });
                      }}
                    >
                      Exportar
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={async () => {
                        const confirmDelete = confirm("¿Eliminar este inventario?");
                        if (!confirmDelete) return;

                        try {
                          await fetch("/api/inventory-file/delete", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
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
              );
            })}
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