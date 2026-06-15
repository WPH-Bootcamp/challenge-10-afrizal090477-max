export interface Category {
  name: string;
  imageSrc: string;
}

export interface RestaurantUI {
  id: string;
  name: string;
  rating: string;
  location: string;
  distance: string;
  imageSrc?: string;
  fallbackText?: string;
}

export interface FilterBarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryName: string) => void;
}

export interface RestaurantListProps {
  restaurants: RestaurantUI[];
}

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category?: string;
  reviewCount?: number;
  menuCount?: number;
  distance: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RestoListResponse {
  success: boolean;
  message: string;
  data: {
    restaurants: Restaurant[];
    pagination?: Pagination;
  };
}


export interface Menu {
  id: number; 
  foodName: string; 
  image: string;
  price: number;
  type: string;
}

export interface Review {
  id: string;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface RestaurantDetail extends Restaurant {
  description?: string;
  menus: Menu[];
  reviews: Review[];
}

export interface RestoDetailResponse {
  success: boolean;
  message: string;
  data: RestaurantDetail;
}

export interface RestoFilterParams {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
}

export interface CartItem {
  id: number;
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  menu: Menu;
  quantity: number;
  itemTotal: number;
}

export interface MenuListProps {
  menus: Menu[];
  onAddMenu: (menuId: string, quantity: number) => void;
  isMutating: boolean;
  cartItems?: CartItem[];
}

export interface MenuCardProps {
  menu: Menu;
  onAddToCart: (menuId: string, quantity: number) => void;
  isAdding: boolean;
  currentQuantity: number;
}

export interface GetCartResponse {
  success: boolean;
  message: string;
  data: CartItem[]; 
}


export interface FilterCriteriaProps {
  distance: string[];
  setDistance: (val: string[]) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  rating: number[];
  setRating: (val: number[]) => void;
  isMobile?: boolean;
}