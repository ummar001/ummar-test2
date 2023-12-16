import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { IExtra } from "../../types/extra.interface";
import { ExtraCard } from "./extraCard";
import { ExtraCardLayout } from "./extraCardLayout";

interface IExtraListProps {
  extras: IExtra[] | undefined
  isLoading: boolean
}

export const ExtrasList: FunctionComponent<IExtraListProps> = ({
  extras,
  isLoading,
}) => {
  return (
    <Box>
      <Typography mb={2} ml={1}>
        Your Extras
      </Typography>
      <Stack flexDirection="column" gap={4}>
        {isLoading || !extras ? (
          <ExtraCardLayout
            name={<Skeleton width="75%"/>}
            price={<Skeleton width="50%"/>}
            category={<Skeleton width="50%"/>}
            remove={<Skeleton width="25%"/>}
            available={<Skeleton width="35%"/>}
          />
        ) : (
          extras.map((extra) => <ExtraCard key={extra.id} extra={extra} />)
        )}
      </Stack>
    </Box>
  );
};
