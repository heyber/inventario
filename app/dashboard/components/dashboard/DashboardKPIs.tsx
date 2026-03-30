export default function DashboardKPIs({ totalValor, totalCantidad, filtered, ticketPromedio }: any) {
  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="kpi-card kpi-indigo">
        ${totalValor.toLocaleString()}
      </div>

      <div className="kpi-card kpi-blue">
        {totalCantidad}
      </div>

      <div className="kpi-card kpi-purple">
        {filtered.length}
      </div>

      <div className="kpi-card kpi-green">
        ${ticketPromedio.toFixed(0)}
      </div>

    </div>
  );
}