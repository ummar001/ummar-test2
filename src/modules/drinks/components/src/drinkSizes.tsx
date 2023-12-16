import DrinkSizeIllustration from "@/common/assets/drinkSizeIllustration.json";
import RemoveIcon from "@/common/assets/removeIcon.png";
import { Card, FormField } from "@/common/components";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Lottie from "lottie-react";
import Image from "next/image";
import { FunctionComponent, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ICreateDrinkPayload, IDrinkSize } from "../../types/drink.interface";

interface IDrinkSizeRowProps {
  size: IDrinkSize
  index: number
  handleChange: (index: number, size: IDrinkSize) => void
  handleRemoveSizeById: (index: number) => void
  canRemove: boolean
  currencySymbol: string
}

const DrinkSizeRow: FunctionComponent<IDrinkSizeRowProps> = ({
  index,
  size,
  handleChange,
  handleRemoveSizeById,
  canRemove,
  currencySymbol,
}) => {
  const { t } = useTranslation("drinks");
  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  return (
    <Grid container spacing={4} alignItems="center">
      {index !== 0 && (
        <Grid item xs={12}>
          <Divider
            sx={{
              width: isSmallScreen ? "100%" : "55%",
            }}
          />
        </Grid>
      )}
      <Grid item xs={12} lg={4}>
        <FormField
          placeholder={t("egRegular")}
          onChange={(e) =>
            handleChange(index, { ...size, name: e.target.value })
          }
          id={`sizes-${index}-size`}
          value={size.name}
          label={t("size")}
        />
      </Grid>
      <Grid item xs={12} lg={2.5}>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <FormField
            placeholder={"E.g. 2.50"}
            onChange={(e) =>
              handleChange(index, { ...size, price: e.target.value })
            }
            id={`sizes-${index}-price`}
            value={size.price === 0 ? "" : size.price}
            inputAdornment={currencySymbol}
            inputAdornmentPosition={currencySymbol === "€" ? "end" : "start"}
            type="number"
            label={t("price")}
          />
          {canRemove && (
            <Image
              src={RemoveIcon}
              alt="Remove Icon"
              onClick={() => handleRemoveSizeById(index)}
              style={{
                cursor: "pointer",
                marginTop: "2rem",
              }}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

interface IDrinkSizesProps {
  formValues: ICreateDrinkPayload
  setFormValues: (formValues: ICreateDrinkPayload) => void
  currencySymbol: string
}

export const DrinkSizes: FunctionComponent<IDrinkSizesProps> = ({
  formValues,
  setFormValues,
  currencySymbol,
}) => {
  const { t } = useTranslation("drinks");
  const handleAddSize = useCallback(() => {
    setFormValues({
      ...formValues,
      sizes: [...formValues.sizes, { name: "", price: 0 }],
    });
  }, [formValues, setFormValues]);

  useEffect(() => {
    if (formValues.sizes.length === 0) {
      handleAddSize();
    }
  }, [formValues, handleAddSize, setFormValues]);

  const handleChangeSizeById = useCallback(
    (index: number, size: IDrinkSize) => {
      const sizes = [...formValues.sizes];
      sizes[index] = size;
      setFormValues({
        ...formValues,
        sizes,
      });
    },
    [formValues, setFormValues]
  );

  const handleRemoveSizeById = useCallback(
    (index: number) => {
      const sizes = [...formValues.sizes];
      sizes.splice(index, 1);
      setFormValues({
        ...formValues,
        sizes,
      });
    },
    [formValues, setFormValues]
  );

  const handleRenderSizes = useCallback(() => {
    return formValues.sizes.map((size, index) => (
      <DrinkSizeRow
        size={size}
        index={index}
        key={index}
        handleChange={handleChangeSizeById}
        handleRemoveSizeById={handleRemoveSizeById}
        canRemove={formValues.sizes.length > 1}
        currencySymbol={currencySymbol}
      />
    ));
  }, [
    currencySymbol,
    formValues.sizes,
    handleChangeSizeById,
    handleRemoveSizeById,
  ]);

  return (
    <Card
      title={t("sizeTitle")}
      description={t("sizeDesc")}
      descriptionLength="80%"
    >
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-225px",
            right: "-100px",
          }}
        >
          <Lottie
            animationData={DrinkSizeIllustration}
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Box>
      <Stack gap={4} pt={2}>
        {handleRenderSizes()}
        <Typography
          sx={{
            color: "#FF5E5D",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleAddSize}
          mt={2}
        >
          {t("addSize")}
        </Typography>
      </Stack>
    </Card>
  );
};
