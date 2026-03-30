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
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1 className="page-title">Inventarios</h1>

        <div className="section">
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
                    type: fileData.type,
                    userId: user.id,
                    description: "Archivo subido",
                  }),
                });

                if (!res.ok) {
                  console.error("Error backend");
                  return;
                }

                const saved = await res.json();

                if (saved) {
                  setInventories((prev) => [saved, ...prev]);
                }
              } catch (error) {
                console.error("Error guardando:", error);
              }
            }}
          />

          <InventoryTable inventories={inventories} loading={loading} />
        </div>
      </div>
    </div>
  );
}