import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

interface IChangeViewProps {
  center: LatLngExpression;
}

export const ChangeView = ({ center }: IChangeViewProps) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};
