import { apiRequest, ApiClientError } from "./client";

export type ObjectiveItem = {
  id: number;
  text: string;
};

export type SubjectRecord = {
  id: number;
  name: string;
  grade: string;
  status: string;
  description: string;
  thumbnail: string | null;
  teachers: number | number[] | null;
  lessons_count?: number;
  moderation_comment: string | null;
  objective_items: ObjectiveItem[];
  objectives?: string[];
  created_at: string;
  updated_at: string;
  created_by: number;
};

export async function getSubjects(token: string): Promise<SubjectRecord[]> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<SubjectRecord[]>("/content/subjects/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export type CreateSubjectRequest = {
  name: string;
  grade: string;
  status: string;
  description: string;
  thumbnail: string | null;
  moderation_comment?: string | null;
  objectives: string[];
};

export type CreateSubjectResponse = SubjectRecord[];

export async function createSubject(
  payload: CreateSubjectRequest,
  token: string,
): Promise<CreateSubjectResponse> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<CreateSubjectResponse>("/content/subjects/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

