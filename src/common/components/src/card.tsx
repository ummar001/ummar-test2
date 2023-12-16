import { Box, Stack, Typography } from "@mui/material";
import { FunctionComponent, PropsWithChildren, useCallback } from "react";

interface ICardProps {
  title?: React.ReactNode | string
  icon?: React.ReactNode
  illustration?: React.ReactNode
  description?: React.ReactNode | string
  bg?: string
  descriptionLength?: string
  border?: string
  onClick?: () => void
  height?: string
  width?: unknown
}

export const Card: FunctionComponent<PropsWithChildren<ICardProps>> = ({
  children,
  title,
  icon,
  description,
  bg = "white",
  illustration,
  descriptionLength = "100%",
  border,
  onClick,
  height,
  width,
}) => {
  const handleRenderTitle = useCallback(() => {
    if (!title) return null;

    return (
      <Stack flexDirection="column">
        <Typography variant="h6" fontWeight="bold" mb={description ? 1.5 : 0}>
          {title}
        </Typography>
        {description && (
          <Typography
            mb={2}
            variant="body2"
            sx={{ color: "#4A4A4A", width: descriptionLength }}
          >
            {description}
          </Typography>
        )}
      </Stack>
    );
  }, [description, descriptionLength, title]);

  const handleRenderIcon = useCallback(() => {
    if (!icon) return null;

    return <Box sx={{ marginTop: "-5.5rem", marginRight: "-3rem" }}>{icon}</Box>;
  }, [icon]);

  const handleRenderIllustration = useCallback(() => {
    if (!illustration) return children;

    return (
      <Box>
        {children}
        <Box
          sx={{
            position: "relative",
          }}
        >
          {illustration}
        </Box>
      </Box>
    );
  }, [children, illustration]);

  return (
    <Box
      sx={{
        backgroundColor: bg,
        borderRadius: { xs: "1.25rem", lg: "1.5rem" },
        height: height ? height : "100%",
        padding: {
          xs: "1.5rem 1rem",
          lg: "2rem 1.5rem",
        },
        border: border,
        width: width ? width : "auto",
      }}
      onClick={onClick}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {handleRenderTitle()}
        {handleRenderIcon()}
      </Stack>
      {handleRenderIllustration()}
    </Box>
  );
};
