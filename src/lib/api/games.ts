import { apiRequest, ApiClientError } from "./client";

export type GameRecord = {
  id: number;
  name: string;
  instructions: string;
  description: string;
  hint: string;
  correct_answer: string;
  type: string;
  image: string | null;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  moderation_comment?: string | null;
};

export async function getGames(token: string): Promise<GameRecord[]> {
  if (!token) {
    throw new ApiClientError("Authentication token is missing", 401);
  }

  return apiRequest<GameRecord[]>("/content/games/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

