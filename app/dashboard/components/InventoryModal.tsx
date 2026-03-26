"use client";

import { useState } from "react";

interface InventoryModalProps {
  inventory: any;
  onClose: () => void;
}

export default function InventoryModal({ inventory, onClose }: InventoryModalProps) {
  const [data, setData] = useState(inventory.data || []);
  const [description, setDescription] = useState(inventory.descripcion || "");

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  // 🟢 EDITAR CELDA
  const handleChange = (rowIndex: number, key: string, value: any) => {
    const updated = [...data];
    updated[rowIndex][key] = value;
    setData(updated);
  };

  // 🟢 AGREGAR FILA
  const handleAddRow = () => {
    const newRow: any = {};
    headers.forEach((h) => (newRow[h] = ""));
    setData([...data, newRow]);
  };

  // 🔴 ELIMINAR FILA
  const handleDeleteRow = () => {
    setData(data.slice(0, -1));
  };

  // 💾 GUARDAR EN DB
  const handleSave = async () => {
    try {
      await fetch("/api/inventory-file/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: inventory.id,
          data: data,
          description: description,
        }),
      });

      alert("Inventario guardado correctamente");
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[95%] max-h-[90vh] overflow-auto border border-gray-300">

        {/* 🔵 HEADER */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          {inventory.nombre}
        </h2>

        {/* 📝 DESCRIPCIÓN EDITABLE */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agregar descripción..."
          className="w-full border p-2 rounded mb-4 text-gray-800"
        />

        {/* 🧰 MENÚ */}
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

        {/* 📊 TABLA */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">

            {/* HEADER */}
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

            {/* BODY */}
            <tbody>
              {data.map((row: any, rowIndex: number) => (
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
              ))}
            </tbody>
          </table>
        </div>

        {/* ❌ CERRAR */}
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