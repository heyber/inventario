"use client";

interface InventoryModalProps {
  inventory: any;
  onClose: () => void;
}

export default function InventoryModal({ inventory, onClose }: InventoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 max-w-full border border-indigo-200">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">Detalles del inventario</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Código:</strong> {inventory.codigo}</p>
          <p><strong>Producto:</strong> {inventory.producto}</p>
          <p><strong>Disponibilidad:</strong> {inventory.disponibilidad}</p>
          <p><strong>Precio:</strong> {inventory.precio}</p>
        </div>
        <button
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}