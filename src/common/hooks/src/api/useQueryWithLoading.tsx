import { useEffect } from "react";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import { useProgress } from "../useProgress";

export const useQueryWithLoading = <TResult, TError>(
  queryKey: string | string[],
  queryFn: () => Promise<TResult>,
  options: Omit<
    UseQueryOptions<Promise<TResult>, TError, TResult, string | string[]>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TResult, TError> => {
  const { toggleLoading } = useProgress();

  const queryResult = useQuery(queryKey, queryFn, {
    onSettled: () => {
      toggleLoading(false);
    },
    ...options,
  });

  const isLoading = queryResult.isLoading;

  useEffect(() => {
    if (isLoading !== undefined) {
      toggleLoading(isLoading);
    }
  }, [isLoading, toggleLoading]);

  return queryResult;
};
