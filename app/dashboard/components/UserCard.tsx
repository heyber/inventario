"use client";

import { useState } from "react";

export default function UserCard({ user }: any) {
  const [data, setData] = useState<any[][]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: any) => {
    try {
      setLoading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      const XLSX = await import("xlsx");

      const reader = new FileReader();

      reader.onload = (evt: any) => {
        try {
          const binaryStr = evt.target.result;

          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // ✅ CAMBIO CLAVE
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          });

          setData(jsonData as any[][]);
        } catch (err) {
          console.error("Error procesando Excel:", err);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsBinaryString(file);
    } catch (err) {
      console.error("Error cargando XLSX:", err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border space-y-6">
      
      {/* Info usuario */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Información del usuario
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-800">
              {user?.email || "No disponible"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">ID</p>
            <p className="font-medium text-gray-800">
              {user?.id || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}