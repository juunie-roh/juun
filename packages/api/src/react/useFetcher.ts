import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { Fetcher } from "@/fetcher";
import FetcherError from "@/fetcher/error";

/**
 * React Query hook for fetching data with Fetcher
 *
 * Wraps a Fetcher instance with React Query's useQuery hook, providing
 * automatic caching, background refetching, and state management.
 *
 * @param fetcher - Configured Fetcher instance
 * @param options - React Query options
 * @returns React Query result with data, loading, error states
 *
 * @example
 * ```typescript
 * function Users({ page, filters }: Props) {
 *   // Query key derived from component state/props
 *   const queryKey = ['users', { page, filters }];
 *
 *   const fetcher = Fetcher.json('https://api.example.com', {
 *     path: '/users',
 *     queryParams: { page, ...filters }
 *   });
 *
 *   const { data, isLoading, error } = useFetcher<User[]>(
 *     fetcher,
 *     { queryKey }
 *   );
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // With React Query options
 * const { data } = useFetcher(
 *   fetcher,
 *   {
 *     queryKey: ['posts', postId],
 *     staleTime: 5000,
 *     enabled: !!postId,
 *     retry: 3
 *   }
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Using query key factory for organization
 * import { createQueryKeyFactory } from '@juun/api/react';
 *
 * const userKeys = createQueryKeyFactory('users');
 *
 * const { data } = useFetcher<User>(
 *   fetcher,
 *   userKeys.detail(userId)
 * );
 *
 * // Easy cache invalidation
 * queryClient.invalidateQueries({ queryKey: userKeys.all() });
 * ```
 */
export function useFetcher<T = unknown>(
  fetcher: Fetcher,
  options: Omit<UseQueryOptions<T, FetcherError>, "queryFn">,
) {
  return useQuery<T, FetcherError>({
    ...options,
    queryFn: async () => {
      return fetcher.fetch<T>();
    },
  });
}
