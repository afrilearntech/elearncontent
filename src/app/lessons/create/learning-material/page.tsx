"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LearningMaterialCreatePage() {
  const router = useRouter();
  const [fileName, setFileName] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);
  const [fileError, setFileError] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [lessonType, setLessonType] = React.useState<string>("");

  function openPicker() {
    inputRef.current?.click();
  }

  function goNext() {
    const type = (lessonType || "pdf").toLowerCase();
    const name = fileName || (type === "video" ? "lesson_video.mp4" : type === "ppt" ? "lesson_slides.pptx" : type === "docx" ? "lesson_file.docx" : "lesson_slides.pdf");
    router.push(`/lessons/create/learning-material/preview?type=${encodeURIComponent(type)}&name=${encodeURIComponent(name)}`);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError("");
    // Enforce 10MB limit ONLY for non-video files
    if (lessonType !== "video" && file.size > 10 * 1024 * 1024) {
      setFileError("File too large (max 10MB)");
      setFileName("");
      return;
    }
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));
  }

  function removeFile() {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileName("");
    setFileError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Lesson</h1>
          <p className="text-sm text-gray-500">Fill in the details to create a subject</p>
        </div>
        <div className="hidden gap-3 sm:flex">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Save Draft</button>
          <button onClick={goNext} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Next</button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Lesson Title */}
        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-medium text-gray-800">Lesson Title<span className="text-rose-600">*</span></label>
          <input type="text" placeholder="eg. Introduction to Algebra" className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"/>
        </section>

        {/* Type + Grade */}
        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">Lesson Type<span className="text-rose-600">*</span></label>
              <select value={lessonType} onChange={(e)=>setLessonType(e.target.value)} className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                <option value="">Select Lesson</option>
                <option value="video">video</option>
                <option value="ppt">ppt</option>
                <option value="pdf">pdf</option>
                <option value="docx">docx</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">Associated Grade Level<span className="text-rose-600">*</span></label>
              <select className="h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500">
                <option>Select Grade Level</option>
                {Array.from({length:12}).map((_,i)=> (
                  <option key={i+1}>{`Grade ${i+1}`}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Lesson Code */}
        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-medium text-gray-800">Lesson Code</label>
          <input type="text" placeholder="eg. Maths1" className="h-11 w-full rounded-lg border border-gray-300 px-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"/>
        </section>

        {/* Description */}
        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-medium text-gray-800">Lesson Description</label>
          <textarea rows={8} placeholder="Write a detailed description for the subject" className="w-full resize-y rounded-lg border border-gray-300 p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"/>
        </section>

        {/* Upload */}
        <section className="rounded-xl border border-gray-200 bg-white p-4">
          <label className="mb-2 block text-sm font-medium text-gray-800">Upload Course Content</label>
          <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l-4-4-4 4"/><path d="M12 12V3"/><path d="M20 21H4"/></svg>
            </div>
            <p className="text-sm text-gray-600">Please select <span className="font-medium">PDF, PPT/PPTX</span> up to 10MB</p>
            <input ref={inputRef} type="file" accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={onFileChange} />
            <button type="button" onClick={openPicker} className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Choose File</button>
            {fileName ? <div className="mt-3 text-sm text-gray-700">Selected: {fileName}</div> : null}
            {fileError ? <div className="mt-2 text-sm text-red-600">{fileError}</div> : null}
          </div>

          {/* Preview */}
          {fileUrl ? (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-900">File Preview</div>
                <button type="button" onClick={removeFile} className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Remove
                </button>
              </div>
              {lessonType === "video" ? (
                <video src={fileUrl} controls className="mx-auto h-56 w-full max-w-3xl rounded-lg bg-black" />
              ) : (
                <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center">
                  <div className="mx-auto my-6 flex h-40 w-full max-w-3xl items-center justify-center rounded-lg bg-white text-gray-600">
                    <div>
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                      </div>
                      <div className="text-sm">Document Preview</div>
                      <div className="text-xs text-gray-500">{fileName}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <button className="rounded-md border border-gray-300 px-3 py-1">&lt;</button>
                    <span>1</span>
                    <span>of 15</span>
                    <button className="rounded-md border border-gray-300 px-3 py-1">&gt;</button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>

        {/* Mobile actions */}
        <div className="flex gap-3 sm:hidden">
          <button className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Save Draft</button>
          <button onClick={goNext} className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Next</button>
        </div>

        <div className="text-center">
          <Link href="/lessons" className="text-sm text-emerald-700 hover:underline">Back to Lessons</Link>
        </div>
      </div>
    </div>
  );
}

