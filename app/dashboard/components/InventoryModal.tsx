"use client";

import { useState } from "react";

interface InventoryModalProps {
  inventory: any;
  onClose: () => void;
}

export default function InventoryModal({ inventory, onClose }: InventoryModalProps) {
  const isMulti = inventory.type === "multi";

  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const getInitialData = () => {
    if (isMulti) {
      const sheets = inventory.data?.sheets;

      if (Array.isArray(sheets) && sheets.length > 0) {
        const firstSheet = sheets[0];

        if (Array.isArray(firstSheet)) return firstSheet;
        if (Array.isArray(firstSheet.data)) return firstSheet.data;
      }

      return [];
    }

    return Array.isArray(inventory.data) ? inventory.data : [];
  };

  const [data, setData] = useState<any[]>(getInitialData());

  const [description, setDescription] = useState(
    inventory.description || ""
  );

  const headers =
    Array.isArray(data) && data.length > 0
      ? Object.keys(data[0])
      : [];

  const handleChange = (rowIndex: number, key: string, value: any) => {
    if (!Array.isArray(data)) return;

    const updated = [...data];
    updated[rowIndex][key] = value;
    setData(updated);
  };

  const handleAddRow = () => {
    if (!Array.isArray(data)) return;

    const newRow: any = {};
    headers.forEach((h) => (newRow[h] = ""));
    setData([...data, newRow]);
  };

  const handleDeleteRow = () => {
    if (!Array.isArray(data)) return;
    setData(data.slice(0, -1));
  };

  const handleSave = async () => {
    try {
      let finalData;

      if (isMulti) {
        const updatedSheets = [...inventory.data.sheets];
        updatedSheets[activeSheetIndex].data = data;

        finalData = {
          sheets: updatedSheets,
        };
      } else {
        finalData = data;
      }

      await fetch("/api/inventory-file/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: inventory.id,
          data: finalData,
          description: description,
        }),
      });

      alert("Inventario guardado correctamente");
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar");
    }
  };

  const handleChangeSheet = (sheet: any, index: number) => {
    setActiveSheetIndex(index);

    if (Array.isArray(sheet)) {
      setData(sheet);
    } else if (Array.isArray(sheet.data)) {
      setData(sheet.data);
    } else {
      setData([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[95%] max-h-[90vh] overflow-auto border border-gray-300">

        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {inventory.name}
        </h2>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agregar descripción..."
          className="w-full border p-2 rounded mb-4 text-gray-800"
        />

        {isMulti && (
          <div className="flex gap-2 mb-4 border-b pb-2">
            {inventory.data?.sheets?.map((sheet: any, index: number) => (
              <button
                key={index}
                onClick={() => handleChangeSheet(sheet, index)}
                className={`px-3 py-1 rounded text-sm ${
                  activeSheetIndex === index
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {sheet.name || `Hoja ${index + 1}`}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4 border-b pb-3">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Guardar
          </button>

          <button
            onClick={handleAddRow}
            className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
          >
            + Fila
          </button>

          <button
            onClick={handleDeleteRow}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Eliminar fila
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-indigo-400">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-2 border text-left text-black font-bold uppercase text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row: any, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className="even:bg-gray-100 odd:bg-white hover:bg-indigo-100"
                  >
                    {headers.map((header) => (
                      <td key={header} className="px-4 py-2 border">
                        <input
                          value={row[header] ?? ""}
                          onChange={(e) =>
                            handleChange(rowIndex, header, e.target.value)
                          }
                          className="w-full bg-transparent outline-none text-black"
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length || 1}
                    className="text-center py-4 text-gray-500"
                  >
                    No hay datos para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}