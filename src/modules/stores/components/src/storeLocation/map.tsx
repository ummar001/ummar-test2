import { LatLng, LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { FunctionComponent, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { ChangeView } from "./changeView";

interface IMapProps {
  center: LatLngExpression | undefined
  handleSetGpsCordinate: (cordinate: string) => void
}

function LocationMarkers({ handleSetGpsCordinate, center }: IMapProps) {
  const initialMarkers: LatLngExpression = new LatLng(51.505, -0.09);
  const [markers, setMarkers] = useState<LatLngExpression>(initialMarkers);

  useEffect(() => {
    if (center !== undefined) {
      setMarkers(center);
    }
  }, [center]);

  useMapEvents({
    click(e) {
      setMarkers(e.latlng);
      handleSetGpsCordinate(`${e.latlng.lat}, ${e.latlng.lng}`);
    },
  });

  return (
    <Marker
      position={markers}
      draggable={true}
      eventHandlers={{
        dragend: (e) =>
          handleSetGpsCordinate(
            `${e.target._latlng.lat}, ${e.target._latlng.lng}`
          ),
      }}
    />
  );
}

const Map: FunctionComponent<IMapProps> = ({
  handleSetGpsCordinate,
  center,
}) => {
  return (
    <MapContainer
      center={center || [40.8054, -74.0241]}
      zoom={20}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
      id="map-select"
    >
      <ChangeView center={center || [40.8054, -74.0241]} />
      <TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
      <LocationMarkers
        handleSetGpsCordinate={handleSetGpsCordinate}
        center={center}
      />
    </MapContainer>
  );
};

export default Map;
