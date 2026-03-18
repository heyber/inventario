"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold">Gserucó</h1>
        <span>Bienvenido, {user}</span>
      </div>

      {/* CONTENIDO */}
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">
          Dashboard
        </h2>

        <p>Ya estás conectado a la base de datos ✅</p>
      </div>
    </div>
  );
}