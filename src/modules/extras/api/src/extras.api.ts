import {
  useMutationWithLoading,
  useQueryWithLoading,
  useSnack,
} from "@/common/hooks";
import { ISuccess } from "@/modules/stores/types";
import { useTranslation } from "react-i18next";
import { UseMutationResult, UseQueryResult, useQueryClient } from "react-query";
import { ICreateExtraPayload, IExtra } from "../../types/extra.interface";
import { getExtrasBackend } from "./backends";
import { EXTRAS_ROUTES } from "./extras.api.enum";

export const useGetExtras = (): UseQueryResult<IExtra[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getDrinks = async (): Promise<IExtra[]> => {
    const extrasBackend = await getExtrasBackend();
    return await extrasBackend.getExtras();
  };

  return useQueryWithLoading(EXTRAS_ROUTES.ALL_EXTRAS, () => getDrinks(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useUpdateExtraAvailability = (extraId: string) => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const updateExtraAvailability = async (
    available: boolean
  ): Promise<IExtra> => {
    const extraBackend = await getExtrasBackend();
    return await extraBackend.updateExtraAvailability(extraId, available);
  };

  return useMutationWithLoading(
    (available: boolean) => updateExtraAvailability(available),
    {
      onSuccess() {
        setSnack({ title: t("successUpdated"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};

export const useCreateExtra = (): UseMutationResult<
  IExtra,
  Error,
  ICreateExtraPayload
> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const queryClient = useQueryClient();

  const createExtra = async (payload: ICreateExtraPayload): Promise<IExtra> => {
    const extrasBackend = await getExtrasBackend();
    return await extrasBackend.createExtra(payload);
  };

  return useMutationWithLoading(
    (payload: ICreateExtraPayload) => createExtra(payload),
    {
      onSuccess() {
        queryClient.refetchQueries(EXTRAS_ROUTES.ALL_EXTRAS);
        setSnack({ title: t("successCreated"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};

export const useDeleteExtra = (): UseMutationResult<
  ISuccess,
  Error,
  string
> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const queryClient = useQueryClient();

  const deleteExtra = async (extraId: string): Promise<ISuccess> => {
    const extrasBackend = await getExtrasBackend();
    return await extrasBackend.deleteExtra(extraId);
  };

  return useMutationWithLoading((extraId: string) => deleteExtra(extraId), {
    onSuccess() {
      queryClient.refetchQueries(EXTRAS_ROUTES.ALL_EXTRAS);
      setSnack({ title: t("successDeleted"), severityType: "success" });
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};
