"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 bg-blue-600 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">HESERUCI</h1>

      <nav className="space-y-2">
        <div
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-lg bg-blue-500 cursor-pointer"
        >
          Dashboard
        </div>

        <div
          onClick={() => router.push("/dashboard/inventories")}
          className="p-2 rounded-lg hover:bg-blue-500 cursor-pointer transition"
        >
          Inventarios
        </div>

        <div className="p-2 rounded-lg hover:bg-blue-500 cursor-pointer transition">
          Usuarios
        </div>
      </nav>
    </div>
  );
}