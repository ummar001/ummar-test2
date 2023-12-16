/* eslint-disable */
import { useEffect } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { useProgress } from "../useProgress";
import { UseInfiniteQueryOptions } from "react-query/types/react/types";

export const useInfiniteQueryWithLoading = <TResult, TError>(
  queryKey: string | string[],
  queryFn: ({
    pageParam = 1,
  }) => Promise<TResult>,
  options: Omit<UseInfiniteQueryOptions<TResult, TError, TResult, TResult, string | string[]>, "queryKey" | "queryFn">
): UseInfiniteQueryResult<TResult, TError> => {
  const { toggleLoading } = useProgress();

  const queryResult = useInfiniteQuery(queryKey, queryFn,
    {
      ...options,
      onSettled            : () => {
        toggleLoading(false);
      },
      getPreviousPageParam : (firstPage: any, pages) => {
        if (firstPage.count > pages.length) {
          return pages.length;
        }
        return undefined;
      },
      getNextPageParam     : (lastPage: any, pages) => {
        if (lastPage.count > pages.length) {
          return pages.length;
        }
        return undefined;
      },
    }
  );

  const isLoading = queryResult.isLoading;

  useEffect(() => {
    if (isLoading !== undefined) {
      toggleLoading(isLoading);
    }
  }, [isLoading, toggleLoading]);

  return queryResult;
};
