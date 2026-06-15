import { useQuery } from '@tanstack/react-query';
import { 
  getRecommendedRestaurants, 
  getRestaurants, 
  getRestaurantDetail,
  searchRestaurants
} from '@/lib/api/resto';
import { restoKeys } from '@/lib/query/keys';
import type { RestoFilterParams } from '@/types/resto';


export const useGetRecommendedRestaurants = () => {
  return useQuery({
    queryKey: restoKeys.recommended ? restoKeys.recommended() : ['restaurants', 'recommended'],
    queryFn: getRecommendedRestaurants,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetRestaurants = (params: RestoFilterParams) => {
  return useQuery({
    queryKey: restoKeys.list ? restoKeys.list(params) : ['restaurants', 'list', params],
    queryFn: () => getRestaurants(params),
    staleTime: 3 * 1000 * 60,
  });
};

export const useGetRestaurantDetail = (id: string) => {
  return useQuery({
    queryKey: restoKeys.detail ? restoKeys.detail(id) : ['restaurants', 'detail', id],
    queryFn: () => getRestaurantDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchRestaurants = (keyword: string) => {
  return useQuery({
    queryKey: ['restaurants', 'search', keyword],
    queryFn: () => searchRestaurants(keyword),
    enabled: keyword.trim().length > 0,
    staleTime: 0,
  });
};