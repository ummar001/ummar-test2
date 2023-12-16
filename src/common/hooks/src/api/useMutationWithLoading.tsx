import { useEffect } from "react";
import { UseMutationOptions, UseMutationResult, useMutation } from "react-query";
import { useProgress } from "../useProgress";

export const useMutationWithLoading = <TData, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: Omit<UseMutationOptions<TData, TError, TVariables, string>, "mutationFn">
): UseMutationResult<TData, TError, TVariables> => {
  const { toggleLoading } = useProgress();

  const mutationResult = useMutation(mutationFn, {
    onSettled: () => {
      toggleLoading(false);
    },
    ...options,
  });

  const isLoading = mutationResult.isLoading;

  useEffect(() => {
    if (isLoading !== undefined) {
      toggleLoading(isLoading);
    }
  }, [isLoading, toggleLoading]);

  return mutationResult;
};
