export default function DashboardKPIs({ totalValor, totalCantidad, filtered, ticketPromedio }: any) {
  const kpis = [
    { label: "Gasto Total", value: `$${totalValor.toLocaleString()}`, color: "kpi-indigo" },
    { label: "Cantidad de Productos", value: totalCantidad, color: "kpi-blue" },
    { label: "Pedidos Filtrados", value: filtered.length, color: "kpi-purple" },
    { label: "Ticket Promedio", value: `$${ticketPromedio.toFixed(0)}`, color: "kpi-green" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className={`kpi-card ${kpi.color}`}>
          <div className="text-sm text-gray-800 font-medium">{kpi.label}</div>
          <div className="text-xl font-bold mt-1">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}