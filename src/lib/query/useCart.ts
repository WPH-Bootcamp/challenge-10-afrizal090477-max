import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api/axios";

export interface AddToCartPayload {
  restaurantId: number;
  menuId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  itemTotal: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: CartItem[];
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

export function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get("/api/cart");
      return data;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const { data } = await api.post(
        "/api/cart",
        payload,
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (
      error: AxiosError<ErrorResponse>,
    ) => {
      console.log(
        "ERROR RESPONSE:",
        error.response?.data,
      );

      console.log(
        "ERROR STATUS:",
        error.response?.status,
      );
    },
  });
}