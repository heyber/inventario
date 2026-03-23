// types/inventory.ts
export interface InventoryItem {
  id: number;
  codigo: string;
  producto: string;
  disponibilidad: number | string;
  precio: number | string;
}