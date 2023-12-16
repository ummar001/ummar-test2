import { BaseLayout } from "@/common/layout";
import {
  DashboardContent,
  DashboardOnBoarding,
  SetupBankSettings,
  SetupExtrasAndDrinks,
  SetupShop
} from "@/modules/dashboard/components";
import { IDashboardSetupItem } from "@/modules/dashboard/types/dashboard.interface";
import { useGetDrinks } from "@/modules/drinks/api";
import { useGetStores } from "@/modules/stores/api";
import { type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const Home: FunctionComponent = () => {
  const { data } = useGetStores();
  const storesSetup =
    data && data.filter((shop) => shop.bankSettings?.accountSetup === true);
  const { data: drinks } = useGetDrinks();
  const { t } = useTranslation("dashboard");

  const dashboardSetupItems: IDashboardSetupItem[] = [
    {
      completed: storesSetup ? storesSetup.length > 0 : false,
      name: t("itemStore"),
      component:
        data && data.length > 0 ? (
          <SetupBankSettings storeId={data[0].id} />
        ) : (
          <SetupShop />
        ),
    },
    {
      completed: drinks ? drinks?.length > 0 : false,
      name: t("itemDrinks"),
      component: <SetupExtrasAndDrinks />,
    }
  ];

  const notCompletedItems = dashboardSetupItems.filter(
    (item) => item.completed === false
  );

  return (
    <BaseLayout pageName={"Dashboard"}>
      {notCompletedItems.length > 0 ? (
        <DashboardOnBoarding dashboardSetupItems={dashboardSetupItems} />
      ) : (
        <DashboardContent storeId={storesSetup ? storesSetup[0].id : ""} />
      )}
    </BaseLayout>
  );
};

export default Home;
