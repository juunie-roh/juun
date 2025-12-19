/**
 * React Query integration for @juun/api
 *
 * This module provides React hooks for using Fetcher with TanStack Query (React Query).
 * It enables declarative data fetching with automatic caching, background updates,
 * and optimistic updates.
 *
 * @module @juun/api/react
 * @requires @tanstack/react-query
 *
 * @example
 * ```typescript
 * import { useFetcher, useMutator } from '@juun/api/react';
 * import { Fetcher } from '@juun/api/fetcher';
 *
 * // Query hook
 * const fetcher = Fetcher.json('https://api.example.com', { path: '/users' });
 * const { data, isLoading } = useFetcher<User[]>(fetcher);
 *
 * // Mutation hook
 * const postFetcher = Fetcher.json('https://api.example.com', {
 *   path: '/users',
 *   method: 'POST'
 * });
 * const mutation = useMutator<User, CreateUserData>(postFetcher);
 * ```
 */

export { useFetcher } from "./useFetcher";
export { useMutator } from "./useMutator";
export type * from "./utils";
export { createQueryKeyFactory } from "./utils";
