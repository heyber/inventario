"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import InventoryTable from "../components/InventoryTable";
import InventoryUploadBox from "../components/InventoryUploBox";

export default function InventoriesPage() {
  const [inventories, setInventories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔵 CARGAR DESDE DB
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await fetch("/api/inventory-file/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        setInventories(data.inventories || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">
          Inventarios
        </h1>

        {/* 🔥 AQUÍ ESTÁ onUpload */}
        <InventoryUploadBox
          onUpload={async (fileData) => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            try {
              const res = await fetch("/api/inventory-file/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: fileData.nombre,
                  data: fileData.data,
                  userId: user.id,
                  description: "Archivo subido",
                }),
              });

              const saved = await res.json();

              setInventories((prev) => [saved, ...prev]);
            } catch (error) {
              console.error("Error guardando:", error);
            }
          }}
        />

        <InventoryTable inventories={inventories} loading={loading} />
      </div>
    </div>
  );
}