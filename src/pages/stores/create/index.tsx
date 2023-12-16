import { useCustomForm } from "@/common/hooks";
import { BaseLayout } from "@/common/layout";
import { useCreateStore } from "@/modules/stores/api";
import {
  StoreCover,
  StoreInformation,
  StoreLocation,
} from "@/modules/stores/components";
import { ICreateStorePayload } from "@/modules/stores/types";
import { Button, Grid, Stack } from "@mui/material";
import { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const CreateStore: FunctionComponent = () => {
  const { t } = useTranslation("store");
  const { mutate } = useCreateStore();
  const { formValues, handleChange, setFormValues } =
    useCustomForm<ICreateStorePayload>({
      description: "",
      location: {
        addressLine1: "",
        city: "",
        country: "",
        gpsCordinate: "",
      },
      storeCover: null,
      name: "",
      subName: "",
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formValues);
  };

  return (
    <BaseLayout pageName={"Create Store"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack gap={8} mt={4}>
          <StoreInformation
            formValues={formValues}
            handleChange={handleChange}
            title={t("createNewStore")}
          />
          <StoreLocation
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <StoreCover formValues={formValues} setFormValues={setFormValues} />
        </Stack>
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} md={4} lg={4} mt={6}>
            <Button variant="contained" fullWidth type="submit" id="submit-store">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </BaseLayout>
  );
};

export default CreateStore;
