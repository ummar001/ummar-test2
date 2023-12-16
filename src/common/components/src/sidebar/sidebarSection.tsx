import { useRouteStartsWith } from "@/common/utils";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, useCallback } from "react";
import { SideBarItem } from "./sidebarItem";

interface ISidebarSectionProps {
  title: string
  links?: {
    label: string
    href: string
    icon: React.ReactElement
  }[]
  buttons?: {
    label: string
    f: () => void
    icon: React.ReactElement
  }[]
}

export const SidebarSection: FunctionComponent<ISidebarSectionProps> = ({
  title,
  links,
  buttons,
}) => {
  const { routeStartsWith } = useRouteStartsWith();
  
  const handleRenderLinks = useCallback(() => {
    if (!links) return;

    return links.map((item, index) => (
      <Link href={item.href} key={index} style={{ textDecoration: "none" }}>
        <SideBarItem icon={item.icon} label={item.label} isSelected={routeStartsWith(item.href)}/>
      </Link>
    ));
  }, [links, routeStartsWith]);

  const handleRenderButtons = useCallback(() => {
    if (!buttons) return;

    return buttons.map((item, index) => (
      <button
        onClick={item.f}
        key={index}
        style={{
          border: 0,
          background: "none",
          width: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <SideBarItem icon={item.icon} label={item.label} />
      </button>
    ));
  }, [buttons]);

  return (
    <Box sx={{ padding: "1rem 0rem" }}>
      <Typography
        variant="body1"
        sx={{
          paddingBottom: ".5rem",
          color: "#8A8DA3",
          fontWeight: 200,
          fontSize: ".9rem",
        }}
      >
        {title}
      </Typography>
      <Stack flexDirection="column" gap={1}>
        {handleRenderLinks()}
        {handleRenderButtons()}
      </Stack>
    </Box>
  );
};
