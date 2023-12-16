import { useGetStores } from "@/modules/stores/api";
import { NoStore, StoreList } from "@/modules/stores/components";
import { StoreCardLayout } from "@/modules/stores/components/src/storeCardLayout";
import { StoreLayout } from "@/modules/stores/layout/src/storeLayout";
import { Skeleton } from "@mui/material";
import { FunctionComponent } from "react";

const Stores: FunctionComponent = () => {
  const { data: stores, isLoading } = useGetStores();

  return (
    <StoreLayout pageName={"Stores"}>
      {isLoading ? (
        <StoreCardLayout
          name={<Skeleton width="25%" />}
          addressLine1={<Skeleton width="50%" />}
          available={<Skeleton width="25%" />}
          chevronRightIcon={<Skeleton width="15%" />}
        />
      ) : stores && stores?.length > 0 ? (
        <StoreList stores={stores} />
      ) : (
        <NoStore />
      )}
    </StoreLayout>
  );
};

export default Stores;
