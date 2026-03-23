"use client";

import React, { ChangeEvent } from "react";

interface InventoryUploadBoxProps {
  onUpload: (newData: any[]) => void;
}

export default function InventoryUploadBox({ onUpload }: InventoryUploadBoxProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;

      // Aquí simulas el parseo de Excel/CSV
      const parsedData = [
        {
          id: Date.now(),
          codigo: "PRD-001",
          producto: "Producto ejemplo",
          disponibilidad: 10,
          precio: 100,
        },
      ];

      onUpload(Array.isArray(parsedData) ? parsedData : []);
    };

    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".xlsx,.csv"
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
        onChange={handleFileChange}
      />
    </div>
  );
}