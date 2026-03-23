"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ServerUser {
  id: string;
  name?: string;
  email?: string;
}

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        setMessage("Respuesta inválida del servidor");
        setLoading(false);
        return;
      }

      console.log("Respuesta del login:", data);

      if (res.ok) {
        // 🔹 Ajuste: data ya es el usuario
        const userFromServer: ServerUser = data;

        const userToStore = {
          id: userFromServer.id,
          name: userFromServer.name || "Usuario",
          email: userFromServer.email || "",
        };

        localStorage.setItem("user", JSON.stringify(userToStore));
        router.push("/dashboard");
      } else {
        setMessage(data.message || "Credenciales incorrectas");
      }
    } catch (error: any) {
      console.error(error);
      setMessage("Error en el login ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Correo"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 mb-5 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Entrando..." : "Iniciar sesión"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}