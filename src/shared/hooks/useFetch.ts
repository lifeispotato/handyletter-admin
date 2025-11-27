import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UseFetchOptions<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn"> {
  enabled?: boolean;
}

/**
 * useFetch - API 요청을 쉽게 사용할 수 있는 커스텀 훅
 * @param {Function} fetchData - queryFn에 들어갈 함수
 * @param {Array} queryKey - React Query에서 사용할 queryKey (예: ["getNotice"])
 * @param {object} params - API 요청 시 전달할 쿼리 파라미터 (예: { size: 10, order: "desc" })
 * @param {object} options - 추가적인 옵션 (예: { enabled: true })
 * @returns {object} - { data, isLoading, error, refetch }
 */
export function useFetch<TData = unknown, TError = Error>(
  fetchData: () => Promise<TData>,
  queryKey: unknown[],
  params: Record<string, unknown> = {},
  options: UseFetchOptions<TData, TError> = {}
) {
  return useQuery<TData, TError>({
    queryKey: [...queryKey, params],
    queryFn: fetchData,
    ...options,
  });
}
