import CreateStoreLocation from "@/common/assets/createStoreLocation.json";
import { Card } from "@/common/components";
import { ICreateStorePayload } from "@/modules/stores/types";
import { Grid, Typography } from "@mui/material";
import Lottie from "lottie-react";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction
} from "react";
import { useTranslation } from "react-i18next";
import { AddressSelect } from "./addressTextField";
import { CitySelect } from "./citySelect";
import { CountrySelect } from "./countrySelect";
import { MapComponent } from "./storeMap";

interface IStoreLocationProps {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const StoreLocation: FunctionComponent<IStoreLocationProps> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");
  return (
    <Card
      title={t("storeLocation")}
      description={t("storeLocationDesc")}
      icon={
        <Lottie
          animationData={CreateStoreLocation}
          style={{
            width: 142,
            height: 142,
          }}
        />
      }
    >
      <Typography variant="body1" ml={0.5} mt=".5rem">
        {t("yourAddress")}
        <span>*</span>
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CountrySelect
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CitySelect formValues={formValues} setFormValues={setFormValues} />
        </Grid>
      </Grid>
      <Grid container spacing={4} mt="-1rem">
        <Grid item xs={12} md={6}>
          <AddressSelect
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MapComponent formValues={formValues} setFormValues={setFormValues} />
      </Grid>
    </Card>
  );
};
