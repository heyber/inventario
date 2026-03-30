"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, city, company, phone }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error al conectar con el servidor ❌");
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        
        <h1 className="register-title">Crear cuenta</h1>

        <div className="register-form">
          <input type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Ciudad" onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="Empresa" onChange={(e) => setCompany(e.target.value)} />
          <input type="text" placeholder="Teléfono" onChange={(e) => setPhone(e.target.value)} />
        </div>

        <button onClick={handleRegister} disabled={loading} className="btn-primary">
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        {message && <p className="form-message">{message}</p>}

        <button onClick={() => router.push("/login")} className="btn-secondary">
          Volver al login
        </button>

      </div>
    </div>
  );
}