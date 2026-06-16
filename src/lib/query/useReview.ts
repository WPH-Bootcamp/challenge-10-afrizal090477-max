import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createReview } from "@/lib/api/review";

import type {
  CreateReviewPayload,
} from "@/types/review";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const useCreateReview = (
  onSuccess?: () => void,
) => {
  return useMutation({
    mutationFn: (
      payload: CreateReviewPayload,
    ) => createReview(payload),

    onSuccess,

    onError: (
      error: AxiosError<ErrorResponse>,
    ) => {
      console.error(
        error.response?.data?.message
      );
    },
  });
};