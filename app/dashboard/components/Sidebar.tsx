"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">HESERUCO</h1>

      <nav className="sidebar-nav">
        <div
          onClick={() => router.push("/dashboard")}
          className="sidebar-item sidebar-item-primary"
        >
          Dashboard
        </div>

        <div
          onClick={() => router.push("/dashboard/inventories")}
          className="sidebar-item sidebar-item-hover"
        >
          Inventarios
        </div>

        <div className="sidebar-item sidebar-item-hover">
          Usuarios
        </div>
      </nav>
    </div>
  );
}