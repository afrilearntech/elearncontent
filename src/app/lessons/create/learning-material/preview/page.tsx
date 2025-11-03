"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function LessonPreviewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const type = (params.get("type") || "pdf").toLowerCase();
  const name = params.get("name") || (type === "video" ? "lesson_video.mp4" : type === "ppt" ? "lesson_slides.pptx" : type === "docx" ? "lesson_file.docx" : "lesson_slides.pdf");

  function renderPreview() {
    if (type === "video") {
      return (
        <div className="relative rounded-xl border-2 border-dashed border-emerald-200 bg-black/70 p-4 text-center text-white">
          <div className="mx-auto my-8 flex h-56 w-full max-w-3xl items-center justify-center rounded-lg bg-black/40">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div className="text-sm text-emerald-100">Video Preview</div>
          <div className="text-xs text-emerald-200">{name}</div>
        </div>
      );
    }
    // document types
    return (
      <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto my-8 flex h-56 w-full max-w-3xl items-center justify-center rounded-lg bg-white text-gray-600">
          <div>
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <div className="text-sm">Document Preview</div>
            <div className="text-xs text-gray-500">{name}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <button className="rounded-md border border-gray-300 px-3 py-1">&lt;</button>
          <span>1</span>
          <span>of 15</span>
          <button className="rounded-md border border-gray-300 px-3 py-1">&gt;</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Lesson Details Page</h1>
          <p className="text-sm text-gray-500">Fill in the details to create a subject</p>
        </div>
        <Link href="/lessons" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Back to lessons</Link>
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-6">
        {renderPreview()}

        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-xs text-emerald-700">Introduction to Maths</div>
          <h2 className="mt-1 text-xl font-semibold text-gray-900">Fundamentals of Reading and WRiting</h2>
          <div className="mt-1 text-xs text-emerald-700">Maths-Less-1</div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900">Lesson Description</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">Lorem ipsum dolor sit amet consectetur. In purus adipiscing risus tortor dolor egestas sit. Uma tellus vitae pellentesque ipsum hac. Nulla lobortis est blandit dignissim amet viverra phasellus lacus eget. Proin mauris consectetur donec nunc rhoncus. Aliquet eu lacus sapien id mauris dis etiam. Nulla dictum lectus ut rhoncus imperdiet pharetra. Nibh nunc ut id faucibus purus donec. Viverra amet faucibus augue quis diam nec pharetra varius. Eget tellus enim mauris tellus massa maecenas sed ullamcorper.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="text-sm font-semibold text-gray-900">Lesson Type</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">Learning Material</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">File Type</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">{type === "ppt" ? "PPT" : type.toUpperCase()}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm">
            <div>
              <div className="text-gray-500">Date Created</div>
              <div className="font-medium text-gray-900">October 21st, 2025</div>
              <div className="mt-3 text-gray-500">Created By</div>
              <div className="font-medium text-gray-900">Bertha Abena Jones</div>
            </div>
            <div>
              <div className="text-gray-500">Last Updated</div>
              <div className="font-medium text-gray-900">October 31st, 2025</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


