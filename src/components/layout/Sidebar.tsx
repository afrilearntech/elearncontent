"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
  iconSrc: string;
  match?: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", iconSrc: "/img/icons/dash-icon.png" },
  { href: "/subjects", label: "Subjects", iconSrc: "/img/icons/subject-icon.png" },
  { href: "/lessons", label: "Lessons", iconSrc: "/img/icons/lessons.png" },
  { href: "/settings", label: "Settings", iconSrc: "/img/icons/settings.png" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/" || pathname.startsWith("/dashboard");
  return pathname.startsWith(href);
}

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 shrink-0 border-r border-black/5 bg-white/95 pt-4 sm:block">
      <nav className="flex h-full flex-col">
        <ul className="px-3 py-2 mt-24 space-y-[15px]">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                    (active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
                  }
                >
                    <Image src={item.iconSrc} alt="" width={24} height={24} />
                    <span className="text-lg font-medium">{item.label}</span>
                  {active ? (
                    <span className="absolute right-0 top-0 h-full w-1.5 rounded-l bg-emerald-500" />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

          <div className="mt-auto p-3">
            <button className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700 w-[220px] h-[50px] mx-auto">
            <Image src="/img/icons/logout.png" alt="" width={16} height={16} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
      {/* Mobile sidebar drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex sm:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative h-full w-64 bg-white border-r border-black/5 pt-4 shadow-xl">
            <nav className="flex h-full flex-col">
              <ul className="px-3 py-2 mt-6 space-y-[15px]">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={
                          "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors " +
                          (active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
                        }
                      >
                        <Image src={item.iconSrc} alt="" width={24} height={24} />
                        <span className="text-lg font-medium">{item.label}</span>
                        {active ? (
                          <span className="absolute right-0 top-0 h-full w-1.5 rounded-l bg-emerald-500" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto p-3">
                <button className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700 w-[220px] h-[50px] mx-auto" onClick={onClose}>
                  <Image src="/img/icons/logout.png" alt="" width={16} height={16} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}


