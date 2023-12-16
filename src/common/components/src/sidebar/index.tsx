import { DashboardIcon } from "@/common/assets/dashboardIcon";
import { DrinkIcon } from "@/common/assets/drinkIcon";
import WaycupLogo from "@/common/assets/logo.png";
import { LogoutIcon } from "@/common/assets/logoutIcon";
import { MultiStoreIcon } from "@/common/assets/multiStoreIcon";
import { PiggyBank } from "@/common/assets/piggyBank";
import { RedeemIcon } from "@/common/assets/redeemIcon";
import { ShopIcon } from "@/common/assets/shopIcon";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { resetUser } from "@/modules/auth/store";
import { useGetDrinks } from "@/modules/drinks/api";
import { useGetStores } from "@/modules/stores/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SidebarSection } from "./sidebarSection";

const drawerWidth = {
  xs: "80%",
  sm: "302px",
};

const UserProfile: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        paddingTop: 3.5,
        paddingBottom: 1,
      }}
    >
      <AccountCircleIcon fontSize="large" />
      <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
        {user?.firstName} {user?.lastName}
      </Typography>
    </Box>
  );
};

export const Sidebar: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const { t } = useTranslation("sidebar");
  const { data: stores } = useGetStores();
  const { data: drinks } = useGetDrinks();
  const areStoresActive = stores && stores.length > 0;
  const isDrinksActive = drinks && drinks.length > 0;

  useEffect(() => {
    if (isDesktop) {
      setOpen(true);
    }
  }, [isDesktop]);

  const handleDrawerToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSignOut = useCallback(async () => {
    await dispatch(resetUser());
  }, [dispatch]);

  const handleGetGeneralSection = useCallback(() => {
    const items = [
      { label: t("dashboard"), href: "/", icon: <DashboardIcon /> },
    ];

    if (areStoresActive && (isDrinksActive)) {
      items.push({ label: t("redeem"), href: "/redeem", icon: <RedeemIcon /> });
    }

    return items;
  }, [areStoresActive, isDrinksActive, t]);

  const handleGetManageSection = useCallback(() => {
    const items = [{ label: t("stores"), href: "/stores", icon: <ShopIcon /> }];

    if (areStoresActive) {
      items.push({
        label: t("drinks"),
        href: "/drinks",
        icon: <DrinkIcon />,
      });
    }

    return items;
  }, [areStoresActive, t]);

  const handleGetSettingsSection = useCallback(() => {
    const items = [];

    if (areStoresActive && stores.length > 1) {
      items.push({
        label: t("multiStore"),
        href: "/multi-store",
        icon: <MultiStoreIcon />,
      });

      items.push({
        label: t("bankSettings"),
        href: "/bank-settings",
        icon: <PiggyBank />,
      });
    }

    return items;
  }, [areStoresActive, stores?.length, t]);

  return (
    <Box
      component="nav"
      sx={{ flexGrow: { md: 1 }, width: { md: drawerWidth.sm } }}
    >
      <Drawer
        anchor="left"
        variant={isDesktop ? "permanent" : "temporary"}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
        }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            padding: "1.5rem .25rem",
            paddingLeft: "2.25rem",
            boxShadow: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "-.75rem",
          }}
        >
          <Link href="/">
            <Image src={WaycupLogo} alt="Waycup-Logo" width={119} height={36} />
          </Link>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: "white",
              boxShadow: 2,
              padding: ".1rem",
              marginRight: "1rem",
              display: { md: "none" },
              color: "black",
            }}
          >
            <ChevronLeftIcon fontSize="medium" />
          </IconButton>
        </Box>
        <UserProfile />
        <List>
          <SidebarSection
            title={t("general")}
            links={handleGetGeneralSection()}
          />
          <SidebarSection
            title={t("manage")}
            links={handleGetManageSection()}
          />
          <SidebarSection
            title={t("settings")}
            links={handleGetSettingsSection()}
            buttons={[
              { label: t("signOut"), f: handleSignOut, icon: <LogoutIcon /> },
            ]}
          />
        </List>
      </Drawer>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon sx={{ color: "black", fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
