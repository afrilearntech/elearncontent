import { apiRequest, ApiClientError } from "./client";
import { ModerateAction, ModerateContentRequest, ModerateContentResponse } from "./lessons";

export type TeacherRecord = {
  id: number;
  profile: number;
  school: number;
  status: string;
  moderation_comment?: string | null;
  created_at: string;
  updated_at: string;
};

export async function getTeachers(token: string): Promise<TeacherRecord[]> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<TeacherRecord[]>("/content/teachers/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export async function moderateTeacher(
  teacherId: number | string,
  action: ModerateAction,
  moderationComment?: string,
  token?: string,
): Promise<ModerateContentResponse> {
  if (!token) {
    if (typeof window === "undefined") {
      throw new ApiClientError("Authentication token is missing", 401);
    }
    token = localStorage.getItem("auth_token") || "";
  }
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  const payload: ModerateContentRequest = {
    model: "school",
    id: teacherId,
    action,
    moderation_comment: moderationComment,
  };

  return apiRequest<ModerateContentResponse>("/content/moderate/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

