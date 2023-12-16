import { useQueryWithLoading, useSnack } from "@/common/hooks";
import { useTranslation } from "react-i18next";
import { UseQueryResult } from "react-query";
import { IPurchasesByStore } from "../../types/dashboard.interface";
import { getPurchasesBackend } from "./backends";
import { DASHBOARD_ROUTES } from "./dashboard.api.enum";

export const useGetPurchasesByStore = (
  storeId: string
): UseQueryResult<IPurchasesByStore[]> => {
  const setSnack = useSnack();
  const { t } = useTranslation("common");

  const getPurchases = async (): Promise<IPurchasesByStore[]> => {
    const purchasesBackend = await getPurchasesBackend();
    return await purchasesBackend.getPurchasesById(storeId);
  };

  return useQueryWithLoading(
    DASHBOARD_ROUTES.GET_PURCHASES,
    () => getPurchases(),
    {
      onError() {
        setSnack({ title: t("internalError"), severityType: "error" });
      },
    }
  );
};
