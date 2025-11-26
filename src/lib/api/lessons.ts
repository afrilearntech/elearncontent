import { apiRequest, ApiClientError } from "./client";

export type LessonRecord = {
  id: number;
  subject: number;
  topic: number;
  period: number;
  title: string;
  description: string;
  type: string;
  status: string;
  resource: string | null;
  thumbnail: string | null;
  created_by: number;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
  moderation_comment?: string | null;
};

export async function getLessons(token: string): Promise<LessonRecord[]> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<LessonRecord[]>("/content/lessons/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export type ModerateModel =
  | "subject"
  | "lesson"
  | "general_assessment"
  | "lesson_assessment"
  | "game"
  | "school"
  | "county"
  | "district";

export type ModerateAction = "approve" | "reject" | "request_changes" | "request_review";

export interface ModerateContentRequest {
  model: ModerateModel;
  id: number | string;
  action: ModerateAction;
  moderation_comment?: string;
}

export interface ModerateContentResponse {
  id: number;
  model: string;
  status: string;
  moderation_comment?: string | null;
}

export async function moderateContent(
  payload: ModerateContentRequest,
  token: string,
): Promise<ModerateContentResponse> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<ModerateContentResponse>("/content/moderate/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  });
}


