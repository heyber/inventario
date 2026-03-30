export default function DashboardHeader({ inventories, inventoryId, setInventoryId, exportPDF }: any) {
  return (
    <div className="dashboard-header">

      <select
        value={inventoryId}
        onChange={e => setInventoryId(e.target.value)}
        className="dashboard-select"
      >
        <option>Seleccionar archivo</option>
        {inventories.map((inv: any) => (
          <option key={inv.id} value={inv.id} className="dashboard-option">
            {inv.name}
          </option>
        ))}
      </select>

      <button
        onClick={exportPDF}
        className="dashboard-btn"
      >
        📄 Exportar PDF
      </button>

    </div>
  );
}