import SubjectsHeader from "@/components/subjects/SubjectsHeader";
import SubjectCard, { SubjectStatus } from "@/components/subjects/SubjectCard";

type Subject = {
  id: string;
  title: string;
  grade: string;
  lessonsCount: number;
  imageSrc: string;
  status: SubjectStatus;
};

const subjects: Subject[] = [
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
  return (
    <div className="space-y-6">
      <SubjectsHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((s) => (
          <SubjectCard
            key={s.id}
            title={s.title}
            grade={s.grade}
            lessonsCount={s.lessonsCount}
            imageSrc={s.imageSrc}
            status={s.status}
          />
        ))}
      </div>
    </div>
  );
}


