export default function Home() {
  return (
    <main className="min-h-screen bg-blue-600 text-white flex flex-col items-center justify-center gap-6">
      
      <h1 className="text-5xl font-bold">Heserucó</h1>
      <p className="text-lg">Tu plataforma base 🚀</p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold"
        >
          Iniciar sesión
        </a>

        <a
          href="/register"
          className="border border-white px-6 py-2 rounded-xl"
        >
          Registrarse
        </a>
      </div>
    </main>
  );
}