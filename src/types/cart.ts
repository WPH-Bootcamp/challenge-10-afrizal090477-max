import { Menu } from "./resto";
import { Restaurant } from "./resto";

export interface CartItem {
  id: string | number;
  quantity: number;
  menu: Menu;
  restaurantId: string;
  itemTotal?: number;
}

export interface CartGroup {
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
}

export interface AddToCartPayload {
  restaurantId: string;
  menuId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  quantity: number;
}

export interface CartApiResponse {
  success: boolean;
  message: string;
  data: {
    cart: CartGroup[];
    summary: {
      totalItems: number;
      totalPrice: number;
      restaurantCount: number;
    };
  };
}