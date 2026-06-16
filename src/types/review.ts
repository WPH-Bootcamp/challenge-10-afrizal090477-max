export interface CreateReviewPayload {
  transactionId: string; 
  restaurantId: number;
  star: number;          
  comment: string;       
  menuIds?: number[];    
}

export interface Review {
  id: string;
  star: number;
  comment: string;
  createdAt: string;
  restaurantId: string;
  transactionId: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  data: Review;
}