import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/auth.store";


interface CheckoutItem {
  menuId: number;
  quantity: number;
}

interface CheckoutRestaurant {
  restaurantId: number;
  items: CheckoutItem[];
}

export interface CheckoutPayload {
  restaurants: CheckoutRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes: string;
}

interface GetOrdersParams {
  status: string;
  limit?: number;
  page?: number;
}

export function useCreateCheckout() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async (payload: CheckoutPayload) => {
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.post(
        "/api-backend/api/order/checkout", 
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("=== API ORDER CHECKOUT BERHASIL ===", response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export const useGetOrders = (params: GetOrdersParams) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["orders", params.status, params.page, params.limit, token],
    queryFn: async () => {
      if (!token) return null;

      const res = await axios.get("/api-backend/api/order/my-order", {
        params: {
          status: params.status, 
          limit: params.limit || 10,
          page: params.page || 1,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("=== DATA AKHIR DARI REAL API TRANSAKSI ===", res.data);
      return res.data;
    },
    enabled: !!token,
  });
};