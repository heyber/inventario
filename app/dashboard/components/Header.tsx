export default function Header({ user }: any) {
  const displayName =
    user?.name || user?.email?.split("@")[0] || "Usuario";

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Panel de control
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Nombre */}
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
          Hola, <strong>{displayName}</strong>
        </div>

        {/* Logout */}
        <form action="/api/logout" method="POST">
          <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">
            Cerrar sesión
          </button>
        </form>

      </div>
    </div>
  );
}