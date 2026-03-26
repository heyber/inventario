"use client";

import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface InventoryUploadBoxProps {
  onUpload: (fileData: {
    nombre: string;
    data: any[];
  }) => void;
}

export default function InventoryUploadBox({ onUpload }: InventoryUploadBoxProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawData = XLSX.utils.sheet_to_json(worksheet);

      const cleanData = rawData.map((row: any) => {
        const normalizedRow: any = {};

        Object.keys(row).forEach((key) => {
          normalizedRow[key.toLowerCase().trim()] = row[key];
        });

        return {
          codigo: normalizedRow["codigo"] ?? "",
          producto: normalizedRow["producto"] ?? "",
          disponibilidad: Number(normalizedRow["disponibilidad"] ?? 0),
          precio: Number(normalizedRow["precio"] ?? 0),
        };
      });

      console.log("DATA LIMPIA:", cleanData);

      onUpload({
        nombre: file.name,
        data: cleanData,
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".xlsx,.csv"
        className="block w-full text-sm text-gray-700 
        file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
        file:text-sm file:font-semibold file:bg-indigo-600 
        file:text-white hover:file:bg-indigo-700 transition"
        onChange={handleFileChange}
      />
    </div>
  );
}