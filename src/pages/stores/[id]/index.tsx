import { useCustomForm } from "@/common/hooks";
import { BaseLayout } from "@/common/layout";
import { useGetStore, useUpdateStore } from "@/modules/stores/api";
import {
  StoreCover,
  StoreInformation,
  StoreLocation,
} from "@/modules/stores/components";
import { ICreateStorePayload } from "@/modules/stores/types";
import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, FunctionComponent, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

const UpdateStore: FunctionComponent = () => {
  const { t } = useTranslation("store");
  
  const router = useRouter();
  const { id } = router.query;

  const { mutate } = useUpdateStore(id ? id.toString() : "");
  const { data } = useGetStore(id ? id.toString() : "");

  const { formValues, handleChange, setFormValues } =
    useCustomForm<ICreateStorePayload>({
      description: data?.description ? data?.description : "",
      storeCover: data?.cover ? data?.cover : null,
      location: {
        addressLine1: data?.location.addressLine1
          ? data?.location.addressLine1
          : "",
        city: data?.location.city ? data?.location.city : "",
        country: data?.location.country ? data?.location.country : "",
        gpsCordinate: data?.location.gpsCordinate
          ? data?.location.gpsCordinate
          : "",
      },
      name: data?.name ? data?.name : "",
      subName: data?.subName ? data?.subName : "",
    });

  useEffect(() => {
    if (data) {
      setFormValues({
        description: data.description,
        storeCover:data?.cover,
        location: {
          addressLine1: data.location.addressLine1,
          city: data.location.city,
          country: data.location.country,
          gpsCordinate: data.location.gpsCordinate,
        },
        name: data.name,
        subName: data.subName,
      });
    }
  }, [data, setFormValues]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      mutate(formValues);
    },
    [formValues, mutate]
  );

  return (
    <BaseLayout pageName={"Update Store"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack gap={8} mt={4}>
          <StoreInformation
            formValues={formValues}
            handleChange={handleChange}
            title={t("updateStore")}
          />
          <StoreLocation
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <StoreCover formValues={formValues} setFormValues={setFormValues} />
        </Stack>
        <Grid container justifyContent="flex-end">
          <Grid item xs={12} md={2} mt={6}>
            <Button variant="contained" fullWidth type="submit" id="submit-store">
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </BaseLayout>
  );
};

export default UpdateStore;
