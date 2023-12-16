import CreateStoreInformation from "@/common/assets/createStoreInformation.json";
import { Card, FormField } from "@/common/components";
import { Grid } from "@mui/material";
import Lottie from "lottie-react";
import { BaseSyntheticEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ICreateStorePayload } from "../../types";

interface IStoreInformationProps {
  formValues: ICreateStorePayload
  handleChange: (e: BaseSyntheticEvent) => void
  title: string
}

export const StoreInformation: FunctionComponent<IStoreInformationProps> = ({
  formValues,
  handleChange,
  title,
}) => {
  const { t } = useTranslation("store");
  
  return (
    <Card
      title={title}
      icon={
        <Lottie
          animationData={CreateStoreInformation}
          style={{
            width: 250,
            height: 142,
            marginTop: "-.5rem",
            marginRight: "-2.5rem",
          }}
        />
      }
    >
      <Grid container justifyContent="space-between" pt={2} spacing={4}>
        <Grid
          item
          xs={12}
          container
          flexDirection="row"
          alignItems="flex-end"
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <FormField
              id="name"
              label={t("storeName")}
              type="text"
              placeholder={t("storeNamePlaceholder")}
              value={formValues.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              id="subName"
              label={t("storeSubTitle")}
              type="text"
              placeholder={t("storeDescPlaceholder")}
              value={formValues.subName}
              onChange={handleChange}
              required={false}
              maxLength={30}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormField
            id="description"
            label={t("storeDesc")}
            type="text"
            placeholder={t("storeDescPlaceholder")}
            value={formValues.description}
            onChange={handleChange}
            required={false}
            maxLength={250}
            rows={5}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
