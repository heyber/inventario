"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import InventoryTable from "../components/InventoryTable";
import InventoryUploadBox from "../components/InventoryUploBox";

export default function InventoriesPage() {
  const [inventories, setInventories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user?.id) throw new Error("Usuario no logueado");

        const res = await fetch("/api/inventory/list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        setInventories(Array.isArray(data) ? data : data.inventories || []);
      } catch (error) {
        console.error("Error cargando inventarios:", error);
        setInventories([]);
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
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">Inventarios</h1>

        <InventoryUploadBox
          onUpload={(newData) =>
            setInventories([
              ...(Array.isArray(inventories) ? inventories : []),
              ...(Array.isArray(newData) ? newData : []),
            ])
          }
        />

        <InventoryTable inventories={inventories} loading={loading} />
      </div>
    </div>
  );
}