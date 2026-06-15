import { Menu, Restaurant } from "./resto";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menu: Menu;
}

export interface Order {
  id: string;
  status: string;
  totalPrice: number;
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
  phone?: string;
  createdAt: string;
  restaurant: Restaurant;
  items: OrderItem[];
}

export interface CheckoutItemPayload {
  menuId: string;
  quantity: number;
}

export interface CheckoutRestaurantPayload {
  restaurantId: string;
  items: CheckoutItemPayload[];
}

export interface CheckoutPayload {
  restaurants: CheckoutRestaurantPayload[];
  deliveryAddress: string;
  phone?: string;
  paymentMethod: string;
  notes?: string;
}