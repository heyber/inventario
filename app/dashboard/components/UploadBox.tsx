"use client";

import { useState } from "react";

interface UploadBoxProps {
  user: { id: string; name?: string } | null;
}

export default function UploadBox({ user }: UploadBoxProps) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!user?.id) {
      alert("Usuario inválido, no se puede subir archivo.");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const fileData = reader.result;

        const res = await fetch("http://localhost:3001/api/inventory/list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, file: fileData }),
        });

        if (!res.ok) throw new Error("Error al subir el archivo");

        alert("Archivo subido con éxito");
      };

      reader.onerror = () => {
        alert("Error leyendo el archivo");
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error desconocido al subir archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <input
        type="file"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
        disabled={loading || !user}
        className="cursor-pointer"
      />
      {loading && <p>Cargando...</p>}
    </div>
  );
}