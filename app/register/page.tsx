"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          city,
          company,
          phone,
        }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error al conectar con el servidor ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-black">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h1>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo"
            className="w-full border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Ciudad"
            className="w-full border p-2 rounded"
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Empresa"
            className="w-full border p-2 rounded"
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            placeholder="Teléfono"
            className="w-full border p-2 rounded"
            onChange={(e) => setPhone(e.target.value)}
          />

        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}