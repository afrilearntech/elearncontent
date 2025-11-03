"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type NavbarProps = {
  rightContent?: React.ReactNode;
  onMenuClick?: () => void;
};

export default function Navbar({ rightContent, onMenuClick }: NavbarProps) {
  const pathname = usePathname();

  const currentTitle = React.useMemo(() => {
    if (!pathname) return "";
    if (pathname === "/" || pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/subjects")) return "Subject";
    if (pathname.startsWith("/lessons")) return "Lessons";
    if (pathname.startsWith("/settings")) return "Settings";
    return "";
  }, [pathname]);
  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-black/5 bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8 sm:pl-64">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
          <Image src="/img/moe.png" alt="Ministry of Education" width={44} height={44} className="rounded-sm" />
          <div className="leading-tight">
            <div className="text-[18px] font-semibold text-[#111827]">Ministry of Education</div>
            <div className="text-[14px] text-[#6B7280]">Liberia eLearning Platform</div>
          </div>
          </div>
          {currentTitle ? (
            <h1 className="hidden sm:block text-2xl font-semibold text-[#111827]">{currentTitle}</h1>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {pathname.startsWith("/subjects") ? (
            <Link href="/subjects/create" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:bg-emerald-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Subject
            </Link>
          ) : null}
          {pathname.startsWith("/lessons") ? (
            <Link href="/lessons/create" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow hover:bg-emerald-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Lesson
            </Link>
          ) : null}
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 sm:hidden"
            onClick={onMenuClick}
          >
            {/* simple hamburger icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="hidden sm:flex items-center gap-3">{rightContent}</div>
        </div>
      </div>
    </header>
  );
}


