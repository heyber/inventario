"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 IMPORT CORRECTO

const clean = (v: any) => String(v || "").trim().toUpperCase();

function normalizeKeys(obj: any) {
  const newObj: any = {};

  for (const key in obj) {
    let newKey = key
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[().°]/g, "")
      .replace(/\s+/g, "_")
      .toUpperCase();

    newObj[newKey] = obj[key];
  }

  return newObj;
}

export function useDashboardData(user: any) {
  const router = useRouter(); // 👈 Ahora router funciona
  const [inventories, setInventories] = useState<any[]>([]);
  const [inventoryId, setInventoryId] = useState("");

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  const [mes, setMes] = useState("Todos");
  const [producto, setProducto] = useState("Todos");
  const [proveedor, setProveedor] = useState("Todos");

  // 🔹 Cargar lista de inventarios
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch("/api/inventory-file/list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        const result = await res.json();
        setInventories(result.inventories || []);
      } catch (err) {
        console.error("Error cargando inventarios:", err);
      }
    };

    fetchList();
  }, [user]);

  // 🔹 Cargar datos del inventario seleccionado
  useEffect(() => {
    if (!inventoryId) return;

    const selected = inventories.find((i) => i.id === inventoryId);
    if (!selected) return;

    let parsed = selected.data;
    if (typeof parsed === "string") parsed = JSON.parse(parsed);

    const sheets = parsed?.sheets || [];

    const getSheet = (name: string) =>
      sheets.find((s: any) => clean(s.name) === clean(name));

    const datos = (getSheet("DATOS")?.data || []).map(normalizeKeys);
    const calendario = (getSheet("CALENDARIO")?.data || []).map(normalizeKeys);
    const proveedores = (getSheet("PROVEEDORES")?.data || []).map(normalizeKeys);
    const productos = (getSheet("PRODUCTOS")?.data || []).map(normalizeKeys);

    const calMap = new Map(calendario.map((c: any) => [clean(c.FECHA), c]));
    const provMap = new Map(proveedores.map((p: any) => [clean(p.CODIGO_PROVEEDOR), p]));
    const prodMap = new Map(productos.map((p: any) => [clean(p.CODIGO_PRODUCTO), p]));

    const merged = datos.map((d: any) => {
      const cal = calMap.get(clean(d.FECHA_PEDIDO)) as any;
      const prov = provMap.get(clean(d.CODIGO_PROVEEDOR)) as any;
      const prod = prodMap.get(clean(d.CODIGO_PRODUCTO)) as any;

      return {
        mes: clean(cal?.MES),
        proveedor: clean(prov?.PROVEEDOR),
        producto: clean(prod?.PRODUCTO),
        cantidad: Number(d.CANTIDAD || 0),
        valor: Number(d.PRECIO_TOTAL || d.PRECIO * d.CANTIDAD || 0),
      };
    });

    setData(merged);
    setFiltered(merged);
  }, [inventoryId, inventories]);

  // 🔹 Aplicar filtros
  useEffect(() => {
    let result = data;

    if (mes !== "Todos") {
      result = result.filter((d) => clean(d.mes) === clean(mes));
    }

    if (producto !== "Todos") {
      result = result.filter((d) => clean(d.producto) === clean(producto));
    }

    if (proveedor !== "Todos") {
      result = result.filter((d) => clean(d.proveedor) === clean(proveedor));
    }

    setFiltered(result);
  }, [mes, producto, proveedor, data]);

  const meses = ["Todos", ...new Set(data.map((d) => d.mes).filter(Boolean))];
  const productos = ["Todos", ...new Set(data.map((d) => d.producto).filter(Boolean))];
  const proveedores = ["Todos", ...new Set(data.map((d) => d.proveedor).filter(Boolean))];

  const totalValor = filtered.reduce((a, b) => a + b.valor, 0);
  const totalCantidad = filtered.reduce((a, b) => a + b.cantidad, 0);
  const ticketPromedio = totalValor / (filtered.length || 1);

  const chartData = useMemo(() => {
    const map = new Map();
    filtered.forEach((item) => {
      if (!map.has(item.producto)) {
        map.set(item.producto, { producto: item.producto, cantidad: 0 });
      }
      map.get(item.producto).cantidad += item.cantidad;
    });
    return Array.from(map.values());
  }, [filtered]);

  return {
    inventories,
    inventoryId,
    setInventoryId,

    mes,
    setMes,
    producto,
    setProducto,
    proveedor,
    setProveedor,

    meses,
    productos,
    proveedores,

    totalValor,
    totalCantidad,
    ticketPromedio,

    filtered,
    chartData,
    router, // 👈 opcional si quieres navegar desde el hook
  };
}