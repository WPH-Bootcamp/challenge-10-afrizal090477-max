import { api } from "@/lib/api/axios";
import type {
  CreateReviewPayload,
  CreateReviewResponse,
} from "@/types/review";

export const createReview = async (
  payload: CreateReviewPayload,
) => {
  const { data } =
    await api.post<CreateReviewResponse>(
      "/api/review",
      payload,
    );

  return data;
};