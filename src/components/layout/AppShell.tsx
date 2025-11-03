"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  return (
    <>
      <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="min-h-screen bg-gray-50 sm:pl-64 pt-16">
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </>
  );
}


