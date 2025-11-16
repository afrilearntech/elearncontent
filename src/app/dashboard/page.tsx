"use client";

import React from "react";
import KPICard from "@/components/dashboard/KPICard";
import LessonsChart from "@/components/dashboard/LessonsChart";
import PerformanceGauge from "@/components/dashboard/PerformanceGauge";

export default function DashboardPage() {
  const kpiData = [
    {
      title: "Total Contents",
      value: "84",
      change: "+12%",
      changeType: "increase" as const,
      changeLabel: "vs last month",
    },
    {
      title: "Approved",
      value: "122",
      change: "+5%",
      changeType: "increase" as const,
      changeLabel: "vs last month",
    },
    {
      title: "Rejected",
      value: "18",
      change: "-3%",
      changeType: "decrease" as const,
      changeLabel: "vs last month",
    },
    {
      title: "Reviews Requested",
      value: "473",
      change: "+15%",
      changeType: "increase" as const,
      changeLabel: "vs last month",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons Performance Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <LessonsChart />
        </div>

        {/* Overall Performance Gauge - Takes 1 column */}
        <div className="lg:col-span-1">
          <PerformanceGauge />
        </div>
      </div>
    </div>
  );
}

