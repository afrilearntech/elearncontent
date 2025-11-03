import LessonsHeader from "@/components/lessons/LessonsHeader";

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
  return (
    <div className="space-y-6">
      <LessonsHeader />

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
                <button aria-label="Edit" className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                <button aria-label="Delete" className="hover:text-rose-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></button>
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
                <button aria-label="Edit" className="hover:text-gray-700"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
                <button aria-label="Delete" className="hover:text-rose-600"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></button>
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
    </div>
  );
}


