export default function UserCard({ user }: any) {
  return (
    <div className="user-card">
      
      {/* Info usuario */}
      <div>
        <h3 className="user-card-title">
          Información del usuario
        </h3>

        <div className="user-card-grid">
          <div>
            <p className="user-card-label">Email</p>
            <p className="user-card-value">
              {user?.email || "No disponible"}
            </p>
          </div>

          <div>
            <p className="user-card-label">ID</p>
            <p className="user-card-value">
              {user?.id || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}