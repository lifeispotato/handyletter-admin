import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";

type DefaultQueryKey = readonly unknown[];

interface UseInfiniteFetchOptions<
  TQueryFnData,
  TError,
  TQueryKey extends DefaultQueryKey,
  TPageParam = unknown
> extends Omit<
    UseInfiniteQueryOptions<
      TQueryFnData, // queryFn data return
      TError, // error
      InfiniteData<TQueryFnData, TPageParam>, // returned data type
      TQueryKey, // query key
      TPageParam // pageParam
    >,
    "queryKey" | "queryFn"
  > {
  enabled?: boolean;
  getNextPageParam: (
    lastPage: TQueryFnData,
    allPages: TQueryFnData[]
  ) => TPageParam | undefined;
  initialPageParam: TPageParam;
}

export function useInfiniteFetch<
  TQueryFnData = unknown,
  TError = Error,
  TQueryKey extends DefaultQueryKey = DefaultQueryKey,
  TPageParam = number
>(
  fetchData: (context: { pageParam: TPageParam }) => Promise<TQueryFnData>,
  queryKey: TQueryKey,
  params: Record<string, unknown> = {},
  options: UseInfiniteFetchOptions<TQueryFnData, TError, TQueryKey, TPageParam>
): UseInfiniteQueryResult<InfiniteData<TQueryFnData, TPageParam>, TError> {
  const paramEntries = Object.entries(params).flat();
  const fullQueryKey = [...queryKey, ...paramEntries] as unknown as TQueryKey;

  return useInfiniteQuery<
    TQueryFnData,
    TError,
    InfiniteData<TQueryFnData, TPageParam>,
    TQueryKey,
    TPageParam
  >({
    queryKey: fullQueryKey,
    queryFn: async ({ pageParam }) =>
      fetchData({ pageParam: pageParam as TPageParam }),
    ...options,
  });
}
