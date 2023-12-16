import {
  useMutationWithLoading,
  useProgress,
  useQueryWithLoading,
  useSnack,
} from "@/common/hooks";
import { STORE_ROUTES } from "@/modules/stores/api/src/store.api.enum";
import { IStore } from "@/modules/stores/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { UseMutationResult, UseQueryResult, useQueryClient } from "react-query";
import {
  IBankSettingsCreate,
  IDeleteBankSettings,
  IDuplicateBankSettingsPayload,
} from "../../interface/bank-settings.interface";
import { getBankSettingsBackend } from "./backends";
import { BANK_SETTINGS_ROUTES } from "./bank-settings.api.enum";

export const useVerifyBankSettings = (
  storeId: string
): UseQueryResult<IStore> => {
  const setSnack = useSnack();
  const router = useRouter();
  const { t } = useTranslation("common");

  const verifyBankSettings = async (): Promise<IStore> => {
    const bankSettingsBackend = await getBankSettingsBackend();
    return await bankSettingsBackend.verifyBankSettings(storeId);
  };

  return useQueryWithLoading(
    [BANK_SETTINGS_ROUTES.CHECK_BANK_SETTINGS, storeId],
    () => verifyBankSettings(),
    {
      onSuccess() {
        router.push(`/stores/settings/${storeId}`);
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
      enabled: storeId.length > 0,
    }
  );
};

export const useCreateBankSettings = (
  storeId: string
): UseQueryResult<IBankSettingsCreate> => {
  const setSnack = useSnack();
  const { toggleLoading } = useProgress();
  const router = useRouter();
  const { t } = useTranslation("common");

  const createBankSettings = async (): Promise<IBankSettingsCreate> => {
    const bankSettingsBackend = await getBankSettingsBackend();
    return await bankSettingsBackend.createBankSettings(storeId);
  };

  return useQueryWithLoading(
    [BANK_SETTINGS_ROUTES.CREATE_BANK_SETTINGS, storeId],
    () => createBankSettings(),
    {
      onSettled() {
        toggleLoading(false);
      },
      onSuccess(data) {
        router.push(data.url);
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
      enabled: storeId.length > 0,
    }
  );
};

export const useUpdateBankSettings = (
  storeId: string
): UseQueryResult<IBankSettingsCreate> => {
  const setSnack = useSnack();
  const router = useRouter();
  const { t } = useTranslation("common");

  const updateBankSettings = async (): Promise<IBankSettingsCreate> => {
    const bankSettingsBackend = await getBankSettingsBackend();
    return await bankSettingsBackend.updateBankSettings(storeId);
  };

  return useQueryWithLoading(
    [BANK_SETTINGS_ROUTES.UPDATE_BANK_SETTINGS, storeId],
    () => updateBankSettings(),
    {
      onSuccess(data) {
        window.open(data.url, "_blank");
        router.back();
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
      enabled: storeId.length > 0,
    }
  );
};

export const useDeleteBankSettings = (): UseMutationResult<
  IDeleteBankSettings,
  Error,
  string
> => {
  const setSnack = useSnack();
  const queryClient = useQueryClient();
  const { t } = useTranslation("common");

  const deleteBankSettings = async (
    storeId: string
  ): Promise<IDeleteBankSettings> => {
    const banksettingsBackend = await getBankSettingsBackend();
    return await banksettingsBackend.deleteBankSettings(storeId);
  };

  return useMutationWithLoading(
    (storeId: string) => deleteBankSettings(storeId),
    {
      onSuccess() {
        queryClient.refetchQueries(STORE_ROUTES.STORES);
        setSnack({ title: t("successDeleted"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};

export const useDuplicateBankSettingsForStore = (): UseMutationResult<
  IStore,
  Error,
  IDuplicateBankSettingsPayload
> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const duplicateBankSettingsForStore = async (
    payload: IDuplicateBankSettingsPayload
  ): Promise<IStore> => {
    const banksettingsBackend = await getBankSettingsBackend();
    return await banksettingsBackend.duplicateBankSettingsForStore(payload);
  };

  return useMutationWithLoading(
    (payload: IDuplicateBankSettingsPayload) =>
      duplicateBankSettingsForStore(payload),
    {
      onSuccess(data: IStore) {
        queryClient.refetchQueries(`${STORE_ROUTES.STORE} + "get", ${data.id}`);
        setSnack({ title: t("successCreated"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};
