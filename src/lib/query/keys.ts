import type { RestoFilterParams } from '@/types/resto';

export const restoKeys = {
  all: ['restaurants'] as const,
  lists: () => [...restoKeys.all, 'list'] as const,
  list: (params: RestoFilterParams) => [...restoKeys.lists(), params] as const,
  recommended: () => [...restoKeys.all, 'recommended'] as const,
  details: () => [...restoKeys.all, 'detail'] as const,
  detail: (id: string) => [...restoKeys.details(), id] as const,
};