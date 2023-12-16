import { Card, FormField } from "@/common/components";
import { useCustomForm, useSnack } from "@/common/hooks";
import { BaseLayout } from "@/common/layout";
import { useCreateExtra, useGetExtras } from "@/modules/extras/api";
import {
  CreateExtrasNav,
  ExtrasList,
  NoExtras,
} from "@/modules/extras/components";
import { SelectCurrency } from "@/modules/extras/components/src/selectCurrency";
import { ICreateExtraPayload } from "@/modules/extras/types/extra.interface";
import {
  Autocomplete,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";

const Extras: FunctionComponent = () => {
  const { t } = useTranslation("drinks");

  const { formValues, handleChange, setFormValues } =
    useCustomForm<ICreateExtraPayload>({
      name: "",
      price: 0,
      category: "",
      currencyCode: "",
    });
  const { data: extras, isLoading } = useGetExtras();
  const { mutate } = useCreateExtra();
  const setSnack = useSnack();

  const handleSubmit = useCallback(() => {
    if (
      formValues.name == "" ||
      formValues.price == 0 ||
      formValues.category == ""
    ) {
      setSnack({ title: "Please fill in all fields", severityType: "error" });
      return;
    }

    mutate(formValues);
    setFormValues({ category: "", name: "", price: 0, currencyCode: "" });
  }, [formValues, mutate, setFormValues, setSnack]);

  return (
    <BaseLayout pageName={"Extras"}>
      <Stack flexDirection="column" gap={4}>
        <CreateExtrasNav />
        <Card
          title={t("addExtraCardTitle")}
          description={t("addExtraCardDesc")}
        >
          <Grid container spacing={3} alignItems="flex-end" pt={2}>
            <Grid item xs={12} md={8} lg={4}>
              <FormField
                placeholder={t("namePlaceholder")}
                onChange={handleChange}
                id="name"
                value={formValues.name}
                label={t("name")}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <FormField
                placeholder={"E.g. 2.50"}
                onChange={handleChange}
                id="price"
                label={t("price")}
                value={formValues.price}
                type="number"
                inputAdornment={
                  <SelectCurrency
                    value={formValues.currencyCode}
                    formValues={formValues}
                    setFormValues={setFormValues}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Typography variant="body1" ml={0.5}>
                {t("subCategory")}*
              </Typography>
              <Autocomplete
                value={formValues.category}
                inputValue={formValues.category}
                onInputChange={(event, newInputValue) => {
                  setFormValues({ ...formValues, category: newInputValue });
                }}
                id="category"
                options={["Shots", "Syrup", "Toppings", "Other"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("subCategoryPlaceholder")}
                    variant="outlined"
                    required
                    sx={{
                      borderRadius: 5,
                      marginTop: 1.5,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleSubmit}
              >
                {t("add")}
              </Button>
            </Grid>
          </Grid>
        </Card>
        {isLoading || (extras && extras.length > 0) ? (
          <ExtrasList extras={extras} isLoading={isLoading} />
        ) : (
          <NoExtras />
        )}
      </Stack>
    </BaseLayout>
  );
};

export default Extras;
