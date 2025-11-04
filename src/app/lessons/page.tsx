"use client";
import LessonsHeader from "@/components/lessons/LessonsHeader";
import Link from "next/link";
import React from "react";

type LessonRow = {
  title: string;
  type: "Learning Material" | "Quiz Assessment";
  subject: string;
  grade: string;
  status: "DRAFT" | "PUBLISHED";
};

const rows: LessonRow[] = [
  { title: "The Solar System", type: "Learning Material", subject: "Maths", grade: "Grade 7", status: "DRAFT" },
  { title: "The Solar System", type: "Learning Material", subject: "Maths", grade: "Grade 7", status: "DRAFT" },
  { title: "The Solar System", type: "Learning Material", subject: "Maths", grade: "Grade 7", status: "DRAFT" },
  { title: "The Solar System", type: "Quiz Assessment", subject: "Maths", grade: "Grade 7", status: "DRAFT" },
  { title: "The Solar System", type: "Quiz Assessment", subject: "Maths", grade: "Grade 7", status: "DRAFT" },
];

export default function LessonsPage() {
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = React.useState<number | null>(null);
  const isEditing = editIndex !== null;
  const isDeleting = deleteIndex !== null;
  const row = editIndex !== null ? rows[editIndex] : null;
  const deleteRow = deleteIndex !== null ? rows[deleteIndex] : null;
  return (
    <div className="space-y-6">
      <LessonsHeader />

      {/* Mobile Create Button */}
      <div className="md:hidden">
        <Link href="/lessons/create" className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Lesson
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="grid grid-cols-12 bg-[#F1F7E4] px-5 py-4 text-sm font-semibold text-gray-800">
          <div className="col-span-5">Lesson Title</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Subject</div>
          <div className="col-span-1">Grade Level</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {rows.map((r, idx) => (
            <div key={idx} className="grid grid-cols-12 items-center px-4 py-4 text-sm">
              <div className="col-span-5 text-gray-900">{r.title}</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${r.type === "Learning Material" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  {r.type}
                </span>
              </div>
              <div className="col-span-2 text-gray-700">{r.subject}</div>
              <div className="col-span-1 text-gray-700">{r.grade}</div>
              <div className="col-span-1">
                <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">{r.status}</span>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-3 text-gray-500">
                <button aria-label="View" className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                <button aria-label="Edit" onClick={() => setEditIndex(idx)} className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                <button aria-label="Delete" onClick={() => setDeleteIndex(idx)} className="hover:text-rose-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rows.map((r, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">{r.title}</h3>
              <div className="flex items-center gap-2 text-gray-500">
                <button aria-label="View" className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                <button aria-label="Edit" onClick={() => setEditIndex(idx)} className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                <button aria-label="Delete" onClick={() => setDeleteIndex(idx)} className="hover:text-rose-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Type:</span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${r.type === "Learning Material" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  {r.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Subject:</span>
                <span className="text-gray-700">{r.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Grade:</span>
                <span className="text-gray-700">{r.grade}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-600">{r.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">&lt;</button>
        {[1,2,3,4,5,9,10].map((n, i)=> (
          <button key={i} className={`rounded-md border px-3 py-1.5 text-sm ${n===3? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>{n}</button>
        ))}
        <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">&gt;</button>
      </div>

      {isEditing ? (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-10">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditIndex(null)} />
          <div className="relative z-101 w-[92%] max-w-2xl rounded-xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Edit Lesson Details</h2>
              <button aria-label="Close" onClick={() => setEditIndex(null)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Lesson Title<span className="text-rose-600">*</span></label>
                <input defaultValue={row?.title} className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500" placeholder="eg. Introduction to Algebra" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Associated Grade Level<span className="text-rose-600">*</span></label>
                <select className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                  <option>Select Grade Level</option>
                  {Array.from({length:12}).map((_,i)=> (<option key={i+1}>{`Grade ${i+1}`}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Lesson Code</label>
                <input className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500" placeholder="eg. Maths1" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Lesson Description</label>
                <textarea rows={6} className="w-full resize-y rounded-lg border border-gray-300 p-4 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500" placeholder="Write a detailed description for the subject" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">Upload Course Content</label>
                <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l-4-4-4 4"/><path d="M12 12V3"/><path d="M20 21H4"/></svg>
                  </div>
                  <p className="text-sm text-gray-600">Please select <span className="font-medium">PDF, PPT/PPTX, DOCX or Video</span></p>
                  <button className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Choose File</button>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditIndex(null)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {isDeleting ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteIndex(null)} />
          <div className="relative z-101 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Delete Lesson</h2>
              <button aria-label="Close" onClick={() => setDeleteIndex(null)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteRow?.title}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteIndex(null)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete action here
                  setDeleteIndex(null);
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


