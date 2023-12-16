import StoreLocationIcon from "@/common/assets/storeLocationIcon.svg";
import { ICreateStorePayload } from "@/modules/stores/types";
import { Box, Stack, Typography } from "@mui/material";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

const LeafletMap = dynamic(() => import("./map"), {
  ssr: false,
});

interface IMapComponent {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const MapComponent: FunctionComponent<IMapComponent> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");

  const [gpsCordinate, setGpsCordinate] = useState<string>("");
  const formGpsCoordinate = formValues.location.gpsCordinate.split(",");
  const baseCordinate: LatLngExpression | undefined =
    formGpsCoordinate.length > 1
      ? [parseFloat(formGpsCoordinate[0]), parseFloat(formGpsCoordinate[1])]
      : undefined;

  useEffect(() => {
    if (gpsCordinate !== "") {
      setFormValues({
        ...formValues,
        location: {
          ...formValues.location,
          gpsCordinate,
        },
      });
      setGpsCordinate("");
    }
  }, [formValues, gpsCordinate, setFormValues]);

  const handleSetGpsCordinate = (cordinate: string) => {
    setFormValues({
      ...formValues,
      location: {
        ...formValues.location,
        gpsCordinate: cordinate,
      },
    });
  };

  return (
    <>
      <Box mt="1.5rem">
        <Stack flexDirection="row" gap={3} alignItems="center" mb="1.5rem">
          <Image src={StoreLocationIcon} alt="store-location-icon" width={15} />
          <Typography>
            {t("gpsPoint")}
          </Typography>
        </Stack>
      </Box>
      <LeafletMap
        center={baseCordinate}
        handleSetGpsCordinate={handleSetGpsCordinate}
      />
    </>
  );
};
