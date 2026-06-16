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

export interface RestaurantItem {
  menuId: number;
  menuName: string;
  image: string;
  quantity: number;
  price: number;
  itemTotal: number;
}

export interface RestaurantInfo {
  id: number;
  name: string;
  logo: string;
}

export interface RestaurantOrder {
  restaurant: RestaurantInfo;
  items: RestaurantItem[];
  subtotal: number;
}

export interface ApiOrder {
  id: number;
  transactionId: string;
  status: string;

  pricing: {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
  };

  restaurants: RestaurantOrder[];

  createdAt: string;
  updatedAt: string;
}

export interface OrderData {
  id: number;

  transactionId: string;
  restaurantId: number;

  restaurantName?: string;
  restaurantLogo?: string;

  foodName?: string;
  foodImage?: string;

  quantity?: number;
  price?: number;

  totalPrice?: number;
  status?: string;
}