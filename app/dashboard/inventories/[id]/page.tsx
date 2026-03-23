"use client";

import { useEffect, useState } from "react";

// Definimos el tipo esperado para los parámetros
interface ResolvedParams {
  id: string;
  [key: string]: any;
}

// Definimos el tipo de cada inventory (puedes ajustar según tu DB)
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function InventoriesPage({ resolvedParams }: { resolvedParams: unknown }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tipamos resolvedParams de forma segura
  const params = (() => {
    if (
      resolvedParams &&
      typeof resolvedParams === "object" &&
      "id" in resolvedParams
    ) {
      return resolvedParams as ResolvedParams;
    }
    return null;
  })();

  useEffect(() => {
    if (!params) {
      setError("Parámetros inválidos");
      return;
    }

    const fetchInventory = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:3001/api/inventory/list?userId=${params.id}`);
        if (!res.ok) throw new Error("Error al obtener inventario");

        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Respuesta del servidor inválida");

        setInventory(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [params]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventarios</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && <p>Cargando inventario...</p>}

      {!loading && !error && inventory.length === 0 && <p>No hay inventarios disponibles.</p>}

      {!loading && inventory.length > 0 && (
        <ul className="space-y-2">
          {inventory.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <p className="font-semibold">{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}