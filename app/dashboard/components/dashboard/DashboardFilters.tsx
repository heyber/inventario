export default function DashboardFilters({
  mes, setMes, meses,
  producto, setProducto, productos,
  proveedor, setProveedor, proveedores
}: any) {
  return (
    <div className="dashboard-filters">

      <select
        value={mes}
        onChange={e => setMes(e.target.value)}
        className="dashboard-filters-select"
      >
        {meses.map((m: any) => <option key={m}>{m}</option>)}
      </select>

      <select
        value={producto}
        onChange={e => setProducto(e.target.value)}
        className="dashboard-filters-select"
      >
        {productos.map((p: any) => <option key={p}>{p}</option>)}
      </select>

      <select
        value={proveedor}
        onChange={e => setProveedor(e.target.value)}
        className="dashboard-filters-select"
      >
        {proveedores.map((p: any) => <option key={p}>{p}</option>)}
      </select>

    </div>
  );
}