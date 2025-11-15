/**
 * Create a query key factory for a specific API
 *
 * Useful for organizing and managing query keys across your application.
 *
 * @param baseUrl - Base URL for all queries in this factory
 * @returns Object with methods to create query keys
 *
 * @example
 * ```typescript
 * const userKeys = createQueryKeyFactory('https://api.example.com');
 *
 * // All users
 * userKeys.all();
 * // Returns: ['https://api.example.com']
 *
 * // Users list with filters
 * userKeys.list({ page: 1, role: 'admin' });
 * // Returns: ['https://api.example.com', 'list', { page: 1, role: 'admin' }]
 *
 * // Single user
 * userKeys.detail(123);
 * // Returns: ['https://api.example.com', 'detail', 123]
 * ```
 */
export function createQueryKeyFactory(baseUrl: string) {
  return {
    all: () => [baseUrl] as const,
    list: (filters?: Record<string, unknown>) =>
      [baseUrl, "list", filters] as const,
    detail: (id: string | number) => [baseUrl, "detail", id] as const,
  };
}

export type QueryKeyFactory = ReturnType<typeof createQueryKeyFactory>;
