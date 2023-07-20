import type { Park } from "@prisma/client";
import { Text } from "grindylocks/styleComponents";
import { Marker } from "react-map-gl";

import styles from "./ParkMapMarker.module.scss";
import { useRouter } from "next/router";

interface IParkMapMarker {
  park: Park;
}
export const ParkMapMarker: React.FC<IParkMapMarker> = (props) => {
  const { park } = props;

  const router = useRouter();

  const handleClick = () => {
    void router.push(`park/${park.id}`);
  };
  return (
    <Marker
      latitude={parseFloat(park.lat)}
      longitude={parseFloat(park.lng)}
      onClick={handleClick}
    >
      <div className={styles.ParkMapMarker}>
        <Text fontSize="small" color="light" textAlign="center" hover="accent">
          {park.name}
        </Text>
      </div>
    </Marker>
  );
};
