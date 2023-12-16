import { BaseLayout } from "@/common/layout";
import {
  BankSettingsList,
  BankSettingsNav,
  NoBankSettings,
} from "@/modules/bank-settings/components";
import { filterStoresWithBankSettings } from "@/modules/bank-settings/utils/filterStoreWithBankSettings";
import { useGetStores } from "@/modules/stores/api";
import { FunctionComponent } from "react";

const BankSettings: FunctionComponent = () => {
  const { data } = useGetStores();
  const stores = filterStoresWithBankSettings(data);

  return (
    <BaseLayout pageName={"Bank Settings"}>
      <BankSettingsNav />
      <main style={{ marginTop: "32px" }}>
        {stores.length > 0 ? <BankSettingsList stores={stores} /> : <NoBankSettings />}
      </main>
    </BaseLayout>
  );
};

export default BankSettings;
