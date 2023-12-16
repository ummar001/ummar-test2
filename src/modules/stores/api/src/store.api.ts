import { useMutationWithLoading, useQueryWithLoading, useSnack } from "@/common/hooks";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  UseMutationResult,
  UseQueryResult,
  useQueryClient
} from "react-query";
import { ICreateStorePayload, IStore, ISuccess } from "../../types";
import { IFormatedAddress } from "../../utils/formatAddress";
import { getStoreBackend } from "./backends";
import { STORE_ROUTES } from "./store.api.enum";

export const useUpdateStoreAvailability = (storeId: string) => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const updateStoreAvailability = async (
    available: boolean
  ): Promise<IStore> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.updateStoreAvailability(storeId, available);
  };

  return useMutationWithLoading(
    (available: boolean) => updateStoreAvailability(available),
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

export const useDuplicateStore = () => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const duplicateStore = async (storeId: string): Promise<ISuccess> => {
    const authBackend = await getStoreBackend();
    return await authBackend.duplicateStore(storeId);
  };

  return useMutationWithLoading((storeId: string) => duplicateStore(storeId), {
    onSuccess() {
      queryClient.refetchQueries(STORE_ROUTES.STORES);
      setSnack({ title: t("successDuplicated"), severityType: "success" });
      router.push("/stores");
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useDeleteStore = () => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteStore = async (storeId: string): Promise<ISuccess> => {
    const authBackend = await getStoreBackend();
    return await authBackend.deleteStore(storeId);
  };

  return useMutationWithLoading((storeId: string) => deleteStore(storeId), {
    onSuccess() {
      queryClient.refetchQueries(STORE_ROUTES.STORES);
      setSnack({ title: t("successDeleted"), severityType: "success" });
      router.push("/stores");
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useUpdateStore = (
  storeId: string
): UseMutationResult<IStore, Error, ICreateStorePayload> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateStore = async (payload: ICreateStorePayload): Promise<IStore> => {
    const authBackend = await getStoreBackend();
    return await authBackend.updateStore(storeId, payload);
  };

  return useMutationWithLoading((payload: ICreateStorePayload) => updateStore(payload), {
    onSuccess(data) {
      router.push("/stores/settings/" + data.id);
      queryClient.refetchQueries(`${STORE_ROUTES.STORE} + "get", ${storeId}`);
      setSnack({ title: t("successUpdated"), severityType: "success" });
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useGetStore = (storeId: string): UseQueryResult<IStore> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getStore = async (): Promise<IStore> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.getStore(storeId);
  };

  return useQueryWithLoading(`${STORE_ROUTES.STORE} + "get", ${storeId}`, () => getStore(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
    enabled: storeId.length > 0,
  });
};

export const useGetStores = (): UseQueryResult<IStore[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getStores = async (): Promise<IStore[]> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.getStores();
  };

  return useQueryWithLoading(STORE_ROUTES.STORES, () => getStores(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useGetCities = (country: string): UseQueryResult<string[][]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getCities = async (): Promise<string[][]> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.getCities(country);
  };

  return useQueryWithLoading("get-cities", () => getCities(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
    enabled: !!country,
  });
};

export const useGetCountries = (): UseQueryResult<string[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getCountries = async (): Promise<string[]> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.getCountries();
  };

  return useQueryWithLoading("get-countries", () => getCountries(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useGetAddress = (
  address: string,
  country: string,
  city: string
): UseQueryResult<IFormatedAddress[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getAddress = async (): Promise<IFormatedAddress[]> => {
    const storeBackend = await getStoreBackend();
    return await storeBackend.getAddress(address, country, city);
  };

  return useQueryWithLoading(`get-address ${address}, ${country}, ${city}`, () => getAddress(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
    enabled: address.length > 0,
  });
};

export const useCreateStore = (): UseMutationResult<
  IStore,
  Error,
  ICreateStorePayload
> => {
  const setSnack = useSnack();
  const router = useRouter();
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();

  const createStore = async (payload: ICreateStorePayload): Promise<IStore> => {
    const authBackend = await getStoreBackend();
    return await authBackend.createStore(payload);
  };

  return useMutationWithLoading(
    (credentials: ICreateStorePayload) => createStore(credentials),
    {
      onSuccess(data) {
        queryClient.refetchQueries(STORE_ROUTES.STORES);
        router.push("/stores/settings/" + data.id);
        setSnack({ title: t("successCreated"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};
