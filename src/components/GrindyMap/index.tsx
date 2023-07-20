import React, { useEffect, useRef, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./GrindyMap.module.scss";
import { useRect } from "grindylocks/lib/hooks/useRect";
import { api } from "grindylocks/utils/api";
import { ParkMapMarker } from "../ParkMapMarker";

interface IProps {}

export const GrindyMap: React.FC<IProps> = (props) => {
  const {} = props;
  const grindyMap = useRef(null);
  const { data } = api.parks.getAll.useQuery();

  const rect = useRect(grindyMap);

  const height = rect?.height ?? 600;
  const width = rect?.width ?? 800;

  const [viewport, setViewport] = useState<{
    latitude?: number;
    longitude?: number;
    zoom?: number;
  }>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 13.5,
      });
    });
  }, []);

  return (
    <div ref={grindyMap} className={styles.GrindyMap}>
      {viewport.latitude && viewport.longitude && (
        <Map
          mapboxAccessToken="pk.eyJ1IjoiZ3JpbmR5bG9ja3MiLCJhIjoiY2xkYzhvOWQ1MDJ6cDNwcWo1d3Z4ZHlmcyJ9.ZuHSX0E3O8SU2_s5kjjxLw"
          initialViewState={viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{ height, width }}
        >
          {data?.map((park) => {
            if (park.lat && park.lng) {
              return <ParkMapMarker park={park} key={park.id} />;
            }
          })}
        </Map>
      )}
    </div>
  );
};

export default GrindyMap;
