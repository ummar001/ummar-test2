import { useMutationWithLoading, useQueryWithLoading, useSnack } from "@/common/hooks";
import { ISuccess } from "@/modules/stores/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  UseMutationResult,
  UseQueryResult,
  useQueryClient
} from "react-query";
import { ICreateDrinkPayload, IDrink } from "../../types/drink.interface";
import { getDrinksBackend } from "./backends";
import { DRINKS_ROUTES } from "./drinks.api.enum";

export const useGetDrinks = (): UseQueryResult<IDrink[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getDrinks = async (): Promise<IDrink[]> => {
    const drinkBackend = await getDrinksBackend();
    return await drinkBackend.getDrinks();
  };

  return useQueryWithLoading(DRINKS_ROUTES.DRINKS, () => getDrinks(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useUpdateDrink = (
  storeId: string
): UseMutationResult<IDrink, Error, ICreateDrinkPayload> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateDrink = async (payload: ICreateDrinkPayload): Promise<IDrink> => {
    const authBackend = await getDrinksBackend();
    return await authBackend.updateDrink(storeId, payload);
  };

  return useMutationWithLoading((payload: ICreateDrinkPayload) => updateDrink(payload), {
    onSuccess() {
      queryClient.refetchQueries(DRINKS_ROUTES.DRINKS);
      router.push("/drinks");
      setSnack({ title: t("successUpdated"), severityType: "success" });
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useUpdateDrinkAvailability = (extraId: string) => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const queryClient = useQueryClient();

  const updateDrinkAvailability = async (
    available: boolean
  ): Promise<IDrink> => {
    const drinkBackend = await getDrinksBackend();
    return await drinkBackend.updateDrinkAvailability(extraId, available);
  };

  return useMutationWithLoading(
    (available: boolean) => updateDrinkAvailability(available),
    {
      onSuccess() {
        queryClient.refetchQueries(DRINKS_ROUTES.DRINKS);
        setSnack({ title: t("successUpdated"), severityType: "success" });
      },
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};

export const useGetDrink = (drinkId: string): UseQueryResult<IDrink> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();

  const getDrink = async (): Promise<IDrink> => {
    const drinkBackend = await getDrinksBackend();
    return await drinkBackend.getDrink(drinkId);
  };

  return useQueryWithLoading([DRINKS_ROUTES.DRINK, drinkId], () => getDrink(), {
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
    enabled: drinkId.length > 0,
  });
};

export const useCreateDrink = (): UseMutationResult<
  IDrink,
  Error,
  ICreateDrinkPayload
> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createDrink = async (payload: ICreateDrinkPayload): Promise<IDrink> => {
    const drinkBackend = await getDrinksBackend();
    return await drinkBackend.createDrink(payload);
  };

  return useMutationWithLoading((payload: ICreateDrinkPayload) => createDrink(payload), {
    onSuccess() {
      queryClient.refetchQueries(DRINKS_ROUTES.DRINKS);
      router.push("/drinks");
      setSnack({ title: t("successCreated"), severityType: "success" });
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};

export const useDeleteDrink = (): UseMutationResult<
  ISuccess,
  Error,
  string
> => {
  const { t } = useTranslation("common");
  const setSnack = useSnack();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteDrink = async (drinkId: string): Promise<ISuccess> => {
    const drinkBackend = await getDrinksBackend();
    return await drinkBackend.deleteDrink(drinkId);
  };

  return useMutationWithLoading((drinkId: string) => deleteDrink(drinkId), {
    onSuccess() {
      queryClient.refetchQueries(DRINKS_ROUTES.DRINKS);
      router.push("/drinks");
      setSnack({ title: t("successCreated"), severityType: "success" });
    },
    onError() {
      setSnack({ title: t("internalError"), severityType: "error" });
    },
  });
};
