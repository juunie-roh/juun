import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { Fetcher } from "../fetcher";
import FetcherError from "../fetcher/error";

/**
 * React Query hook for mutations with Fetcher
 *
 * Wraps Fetcher mutations (POST, PUT, PATCH, DELETE) with React Query's useMutation.
 * Handles loading states, errors, and success callbacks automatically.
 *
 * @template TData - The expected response data type
 * @template TVariables - The mutation variables type (request body)
 * @param fetcher - Configured Fetcher instance
 * @param options - React Query mutation options
 * @returns React Query mutation result
 *
 * @example
 * ```typescript
 * interface CreateUserData {
 *   name: string;
 *   email: string;
 * }
 *
 * function CreateUser() {
 *   const fetcher = Fetcher.json('https://api.example.com', {
 *     path: '/users',
 *     method: 'POST'
 *   });
 *
 *   const mutation = useMutator<User, CreateUserData>(fetcher, {
 *     onSuccess: (user) => {
 *       console.log('User created:', user);
 *     }
 *   });
 *
 *   const handleSubmit = (data: CreateUserData) => {
 *     mutation.mutate(data);
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {mutation.isPending && <p>Creating...</p>}
 *       {mutation.isError && <p>Error: {mutation.error.message}</p>}
 *     </form>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // With query invalidation
 * const mutation = useMutator<User, UpdateUserData>(fetcher, {
 *   onSuccess: (data, variables, context) => {
 *     queryClient.invalidateQueries({ queryKey: ['users'] });
 *   }
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Dynamic body updates
 * const fetcher = Fetcher.json('https://api.example.com', {
 *   path: '/posts',
 *   method: 'POST'
 * });
 *
 * const mutation = useMutator<Post, { title: string }>(fetcher);
 *
 * // Variables are automatically set as request body
 * mutation.mutate({ title: 'New Post' });
 * ```
 */
export function useMutator<TData = unknown, TVariables = void>(
  fetcher: Fetcher,
  options?: Omit<
    UseMutationOptions<TData, FetcherError, TVariables>,
    "mutationFn"
  >,
) {
  return useMutation<TData, FetcherError, TVariables>({
    ...options,
    mutationFn: async (variables: TVariables) => {
      // Create a new fetcher with the variables as body
      const config = fetcher.config;
      const bodyFetcher = new Fetcher({
        ...config,
        body: variables,
      });

      return bodyFetcher.fetch<TData>();
    },
  });
}
