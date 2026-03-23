"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UserCard from "./components/UserCard";
import StatsCard from "./components/StatsCard";
import UploadBox from "./components/UploadBox";

// Tipado seguro del usuario
interface User {
  id: string;
  name?: string;
  email?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    setLoadingUser(true);

    const storedUser = localStorage.getItem("user");

    try {
      const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser || !parsedUser.id) throw new Error("Usuario inválido");

      setUser(parsedUser);
    } catch (err) {
      console.warn("Usuario inválido en localStorage, se limpia");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Mostrar estado de carga */}
        {loadingUser && <p>Cargando usuario...</p>}

        {/* Mensaje si no hay usuario */}
        {!loadingUser && !user && (
          <p className="text-red-500 font-semibold">No hay usuario logueado</p>
        )}

        {/* Header con fallback si falta name */}
        {user && <Header user={{ name: user.name || "Usuario" }} />}

        {/* UserCard */}
        {user && <UserCard user={user} />}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Registros" value="120" />
          <StatsCard title="Archivos" value="8" />
          <StatsCard title="Usuarios" value="3" />
        </div>

        {/* UploadBox seguro */}
        <UploadBox user={user} />
      </div>
    </div>
  );
}