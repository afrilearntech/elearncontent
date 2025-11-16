"use client";

import React from "react";

type KPICardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  changeLabel: string;
};

export default function KPICard({ title, value, change, changeType, changeLabel }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{title}</div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{value}</div>
      <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
        <span
          className={`font-semibold ${
            changeType === "increase" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {changeType === "increase" ? "▲" : "▼"} {change}
        </span>
        <span className="text-gray-500">{changeLabel}</span>
      </div>
    </div>
  );
}

