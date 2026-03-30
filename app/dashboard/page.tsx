"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UserCard from "./components/UserCard";
import DashboardMain from "./components/DashboardCharts";

interface User {
  id: string;
  name?: string;
  email?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setLoadingUser(true);

    const storedUser = localStorage.getItem("user");

    try {
      const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser || !parsedUser.id) throw new Error("Usuario inválido");

      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        {loadingUser && <p className="text-loading">Cargando usuario...</p>}

        {!loadingUser && !user && (
          <p className="text-error">No hay usuario logueado</p>
        )}

        {user && <Header user={{ name: user.name || "Usuario" }} />}
        {user && <UserCard user={user} />}
        {user && <DashboardMain user={user} />}
      </div>
    </div>
  );
}