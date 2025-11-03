"use client";

import React from "react";

export default function LessonsHeader() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="search by lesson title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:max-w-md"
          />
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            <select className="min-w-[140px] rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
              <option>Subject</option>
              <option>Maths</option>
              <option>English</option>
            </select>
            <select className="min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
              <option>Grade</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i + 1}>{`Grade ${i + 1}`}</option>
              ))}
            </select>
            <select className="min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
              <option>Grade</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i + 1}>{`Grade ${i + 1}`}</option>
              ))}
            </select>
            <select className="min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700">
              <option>Status</option>
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
        </div>
        {/* Create Lesson button lives in the Navbar on this route */}
      </div>
    </div>
  );
}


