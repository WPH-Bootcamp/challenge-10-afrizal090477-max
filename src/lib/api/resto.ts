import { api } from './axios';
import type { 
  Restaurant, 
  RestaurantDetail, 
  RestoDetailResponse, 
  RestoFilterParams, 
  RestoListResponse 
} from '@/types/resto';


export const getRestaurants = async (params?: RestoFilterParams): Promise<Restaurant[]> => {
  let targetEndpoint = '/api/resto';
  
  const queryParams: Record<string, string | number | undefined> = { ...params };

  if (params?.category) {
    const lowerCategory = params.category.toLowerCase();
    
    if (lowerCategory === 'nearby') {
      targetEndpoint = '/api/resto/nearby';
      delete queryParams.category; 
    } else if (lowerCategory === 'best seller') {
      targetEndpoint = '/api/resto/best-seller'; 
      delete queryParams.category;
    }
  }

  try {
    const { data } = await api.get<RestoListResponse>(targetEndpoint, { params: queryParams });
    return data?.data?.restaurants || [];
  } catch (error) {
    console.error(`Gagal mengambil data dari endpoint ${targetEndpoint}:`, error);
    throw error;
  }
};

export const getRecommendedRestaurants = async (): Promise<Restaurant[]> => {
  const { data } = await api.get<RestoListResponse>('/api/resto/recommended');
  return data?.data?.restaurants || [];
};

export const getRestaurantDetail = async (id: string): Promise<RestaurantDetail> => {
  const { data } = await api.get<RestoDetailResponse>(`/api/resto/${id}`);
  return data.data;
};

export const searchRestaurants = async (keyword: string): Promise<Restaurant[]> => {
  try {
    const { data } = await api.get<RestoListResponse>('/api/resto/search', {
      params: { 
        q: keyword 
      },
    });
    return data?.data?.restaurants || [];
  } catch (error) {
    console.error(`Gagal melakukan pencarian restoran dengan keyword "${keyword}":`, error);
    throw error;
  }
};