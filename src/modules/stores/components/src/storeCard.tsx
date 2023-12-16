import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Link, Stack, Typography } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IStore } from "../../types";
import { StoreCardLayout } from "./storeCardLayout";

interface IStoreCardProps {
  store: IStore
}

export const StoreCard: FunctionComponent<IStoreCardProps> = ({ store }) => {
  const { t } = useTranslation("store");

  const handleRenderAvailable = useCallback(() => {
    const backgroundColor =
      store.available && store.bankSettings?.accountSetup
        ? "#2BD687"
        : "#A4A4A4";
    const text =
      store.available && store.bankSettings?.accountSetup
        ? t("available")
        : t("unavailable");

    return (
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "100%",
            backgroundColor,
          }}
        ></Box>
        <Typography>{text}</Typography>
      </Stack>
    );
  }, [store.available, store.bankSettings?.accountSetup, t]);

  return (
    <StoreCardLayout
      name={
        <Typography
          fontWeight="bold"
          fontSize="1.1rem"
        >
          {store.name}
        </Typography>
      }
      addressLine1={
        <Typography
          sx={{
            width: {
              sm: "45%",
              md: "50%",
              xl: "70%",
            },
            display: {
              xs: "none",
              sm: "block",
            },
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {store.location.addressLine1}
        </Typography>
      }
      available={handleRenderAvailable()}
      chevronRightIcon={
        <Link href={`/stores/settings/${store.id}`} data-testid="chevron-icon">
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#FF5E5D",
              padding: 0.5,
              borderRadius: 10,
              width: "fit-content",
              color: "white",
            }}
          >
            <ChevronRightIcon />
          </Box>
        </Link>
      }
    />
  );
};
