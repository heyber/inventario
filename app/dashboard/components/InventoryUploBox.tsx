"use client";

import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface InventoryUploadBoxProps {
  onUpload: (fileData: {
    nombre: string;
    data: any;
    type: string;
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

      const sheets = workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];

        const rawData = XLSX.utils.sheet_to_json(worksheet);

        const cleanData = rawData.map((row: any) => {
          const normalizedRow: any = {};
          Object.keys(row).forEach((key) => {
            normalizedRow[key.toLowerCase().trim()] = row[key];
          });
          return normalizedRow;
        });

        return {
          name: sheetName,
          data: cleanData,
        };
      });

      const isMulti = sheets.length > 1;

      onUpload({
        nombre: file.name,
        type: isMulti ? "multi" : "simple",
        data: isMulti ? { sheets } : sheets[0].data,
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="upload-box">
      <input
        type="file"
        accept=".xlsx,.csv"
        className="upload-input"
        onChange={handleFileChange}
      />
    </div>
  );
}