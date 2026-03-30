export default function Header({ user }: any) {
  const displayName = user?.name || user?.email?.split("@")[0] || "Usuario";

  return (
    <div className="dashboard-header">
      
      <div className="dashboard-header-left">
        <h2>Dashboard</h2>
        <p>Panel de control</p>
      </div>

      <div className="dashboard-header-right">

        {/* Nombre */}
        <div className="dashboard-user-badge">
          Hola, <strong>{displayName}</strong>
        </div>

        {/* Logout */}
        <form action="/api/logout" method="POST">
          <button className="dashboard-logout-btn">
            Cerrar sesión
          </button>
        </form>

      </div>
    </div>
  );
}