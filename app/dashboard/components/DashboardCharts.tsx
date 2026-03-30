"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useDashboardData } from "./dashboard/useDashboardData";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardFilters from "./dashboard/DashboardFilters";
import DashboardKPIs from "./dashboard/DashboardKPIs";

export default function DashboardMain({ user }: any) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const data = useDashboardData(user);

  // 🔥 FIX COLORES PARA EXPORTAR PDF
  const fixColorsForExport = (element: HTMLElement) => {
    const all = element.querySelectorAll("*");
    all.forEach((el: any) => {
      const style = window.getComputedStyle(el);
      const badColor = (value: string) =>
        value.includes("lab") || value.includes("oklch");
      if (badColor(style.color)) el.style.color = "#111827";
      if (badColor(style.backgroundColor)) el.style.backgroundColor = "#ffffff";
      if (badColor(style.borderColor)) el.style.borderColor = "#e5e7eb";
    });
  };

  const exportPDF = async () => {
    if (!dashboardRef.current) return;
    fixColorsForExport(dashboardRef.current);

    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("dashboard.pdf");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <DashboardHeader {...data} exportPDF={exportPDF} />

      <div ref={dashboardRef} className="dashboard-container">
        {/* FILTROS */}
        <DashboardFilters {...data} />

        {/* KPIs */}
        <DashboardKPIs {...data} />

        {/* 📊 GRÁFICA */}
        <div className="dashboard-chart-container">
          <h3 className="dashboard-section-title">📊 Productos más comprados</h3>

          {data.chartData.length === 0 ? (
            <p className="dashboard-empty-text">No hay datos</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <div style={{ minWidth: data.chartData.length * 90 }}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="producto"
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={80}
                      tick={{ fill: "#374151", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#374151" }} />
                    <Tooltip />
                    <Bar dataKey="cantidad" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}