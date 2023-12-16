import { Card, CheckboxWithLabel } from "@/common/components";
import { useGetExtras } from "@/modules/extras/api";
import { Grid } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ICreateDrinkPayload } from "../../types/drink.interface";

interface IDrinkExtrasProps {
  formValues: ICreateDrinkPayload
  setFormValues: (formValues: ICreateDrinkPayload) => void
  currencyCode: string
}

export const DrinkExtras: FunctionComponent<IDrinkExtrasProps> = ({
  formValues,
  setFormValues,
  currencyCode,
}) => {
  const { t } = useTranslation("drinks");
  const { data } = useGetExtras();

  const handleCheckIfSelectedById = useCallback(
    (id: string) => {
      return formValues.extras.some((extra) => extra === id);
    },
    [formValues]
  );

  const handleChangeById = useCallback(
    (id: string, value: boolean) => {
      if (value) {
        setFormValues({
          ...formValues,
          extras: [...formValues.extras, id],
        });
      } else {
        setFormValues({
          ...formValues,
          extras: formValues.extras.filter((extra) => extra !== id),
        });
      }
    },
    [formValues, setFormValues]
  );

  const handleRenderExtras = useCallback(() => {
    if (!data) return null;

    const filteredExtras = data.filter(
      (extra) => extra.currencyCode === currencyCode
    );

    return filteredExtras.map((extra, index) => {
      return (
        <Grid item xs={12} md={4} key={index}>
          <CheckboxWithLabel
            label={extra.name}
            checked={handleCheckIfSelectedById(extra.id)}
            id={extra.id}
            handleChange={handleChangeById}
          />
        </Grid>
      );
    });
  }, [currencyCode, data, handleChangeById, handleCheckIfSelectedById]);

  return (
    <Card
      title={t("whichExtra")}
      description={
        <span>
          {t("whichExtraDesc")}{" "}
          <Link
            href="/drinks/extras"
            style={{
              color: "#FF5E5D",
            }}
          >
            {t("whichExtraDescLink")}
          </Link>
          .
        </span>
      }
    >
      <Grid container spacing={2} pt={2}>
        {handleRenderExtras()}
      </Grid>
    </Card>
  );
};
