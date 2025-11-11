"use client";
import SubjectsHeader from "@/components/subjects/SubjectsHeader";
import SubjectCard, { SubjectStatus } from "@/components/subjects/SubjectCard";
import React from "react";

type Subject = {
  id: string;
  title: string;
  grade: string; // numeric string e.g. "5"
  lessonsCount: number;
  imageSrc: string;
  status: SubjectStatus;
};

const initialSubjects: Subject[] = [
  {
    id: "1",
    title: "Reading and Writing",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    status: "APPROVED",
  },
  {
    id: "2",
    title: "Mathematics",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    status: "APPROVED",
  },
  {
    id: "3",
    title: "Art & Craft",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    status: "DRAFT",
  },
  {
    id: "4",
    title: "Music & Movement",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    status: "PENDING",
  },
  {
    id: "5",
    title: "Computer Basics / Digital Literacy",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    status: "APPROVED",
  },
  {
    id: "6",
    title: "Environmental Studies / Nature",
    grade: "5",
    lessonsCount: 12,
    imageSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    status: "APPROVED",
  },
];

export default function SubjectsPage() {
  const [list, setList] = React.useState<Subject[]>(initialSubjects);
  const [query, setQuery] = React.useState("");
  const [grade, setGrade] = React.useState("All");
  const [status, setStatus] = React.useState("All");

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  // Edit form local state
  const editingSubject = editingId ? list.find((s) => s.id === editingId) : null;
  const [editTitle, setEditTitle] = React.useState("");
  const [editGrade, setEditGrade] = React.useState("");
  const [editImagePreview, setEditImagePreview] = React.useState<string>("");
  const [editImageFile, setEditImageFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (editingSubject) {
      setEditTitle(editingSubject.title);
      setEditGrade(editingSubject.grade ? `Grade ${editingSubject.grade}` : "");
      setEditImagePreview(editingSubject.imageSrc);
      setEditImageFile(null);
    }
  }, [editingSubject]);

  React.useEffect(() => {
    return () => {
      if (editImageFile) URL.revokeObjectURL(editImagePreview);
    };
  }, [editImageFile, editImagePreview]);

  const filtered = React.useMemo(() => {
    return list.filter((s) => {
      const matchesQuery = query.trim().length === 0 || s.title.toLowerCase().includes(query.toLowerCase());
      const matchesGrade = grade === "All" || s.grade === grade.replace("Grade ", "");
      const matchesStatus =
        status === "All" ||
        (status === "Published" && s.status === "APPROVED") ||
        (status === "Draft" && s.status === "DRAFT") ||
        (status === "Pending" && s.status === "PENDING");
      return matchesQuery && matchesGrade && matchesStatus;
    });
  }, [list, query, grade, status]);

  function openEdit(id: string) {
    setEditingId(id);
  }

  function closeEdit() {
    setEditingId(null);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditImageFile(file);
    setEditImagePreview(url);
  }

  function clearImage() {
    if (editImageFile && editImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(editImagePreview);
    }
    // Reset to original image if available
    if (editingSubject) {
      setEditImagePreview(editingSubject.imageSrc);
    }
    setEditImageFile(null);
  }

  function applyEdit() {
    if (!editingId) return;
    setList((prev) => prev.map((s) => (s.id === editingId ? {
      ...s,
      title: editTitle.trim() || s.title,
      grade: editGrade.startsWith("Grade ") ? editGrade.replace("Grade ", "") : s.grade,
      imageSrc: editImagePreview || s.imageSrc,
    } : s)));
    setEditingId(null);
  }

  function openDelete(id: string) {
    setDeletingId(id);
  }

  function cancelDelete() {
    setDeletingId(null);
  }

  function confirmDelete() {
    if (!deletingId) return;
    setList((prev) => prev.filter((s) => s.id !== deletingId));
    setDeletingId(null);
  }

  return (
    <div className="space-y-6">
      <SubjectsHeader
        onSearch={setQuery}
        grade={grade}
        status={status}
        onGradeChange={setGrade}
        onStatusChange={setStatus}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
          No subjects match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <SubjectCard
              key={s.id}
              title={s.title}
              grade={s.grade}
              lessonsCount={s.lessonsCount}
              imageSrc={s.imageSrc}
              status={s.status}
              onEdit={() => openEdit(s.id)}
              onDelete={() => openDelete(s.id)}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingId && editingSubject ? (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-10">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative z-101 w-[92%] max-w-2xl rounded-xl bg-white p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Edit Subject</h2>
              <button aria-label="Close" onClick={closeEdit} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Subject Name<span className="text-rose-600">*</span></label>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500" placeholder="eg. Mathematics" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Grade Level<span className="text-rose-600">*</span></label>
                <select value={editGrade} onChange={(e) => setEditGrade(e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select Grade Level</option>
                  {Array.from({length:12}).map((_,i)=> (
                    <option key={i+1}>{`Grade ${i+1}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">Cover Image</label>
                {editImagePreview ? (
                  <div className="mb-3 overflow-hidden rounded-lg border border-gray-200">
                    <img src={editImagePreview} alt="Preview" className="h-40 w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    Choose Image
                  </label>
                  <button onClick={clearImage} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Remove</button>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={closeEdit} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={applyEdit} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete Confirmation Modal */}
      {deletingId ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={cancelDelete} />
          <div className="relative z-101 w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Delete Subject</h2>
              <button aria-label="Close" onClick={cancelDelete} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete this subject? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


