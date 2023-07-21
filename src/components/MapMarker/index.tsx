import type { Business, Park } from "@prisma/client";
import { Text } from "grindylocks/styleComponents";
import { Marker } from "react-map-gl";

import styles from "./MapMarker.module.scss";
import { useRouter } from "next/router";

interface IParkMapMarker {
  item: Park | Business;
  type: 'park' | 'business';
}
export const MapMarker: React.FC<IParkMapMarker> = (props) => {
  const { item, type } = props;
  console.log(item)

  const router = useRouter();

  const handleClick = () => {
    if (type === 'park') {
      void router.push(`park/${item.id}`);
    } else if (type === 'business') {
      void router.push(`business/${item.id}`)
    }
  };
  return (
    <Marker
      latitude={parseFloat(item.lat)}
      longitude={parseFloat(item.lng)}
      onClick={handleClick}
    >
      <div className={styles.MapMarker}>
        <Text fontSize="small" color="light" textAlign="center" hover="accent">
          {item.name}
        </Text>
      </div>
    </Marker>
  );
};
