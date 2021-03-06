import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import mapIcon from "../../utils/mapIcon";

import NavBar from "../../components/NavBar";

import api from "../../services/api";

import styles from "./styles.module.scss";

import { useLocationUser } from "../../context/UserLocation";

interface Ngos {
  id: string;
  nome_fantasia: string;
  latitude: number;
  longitude: number;
}

const PageMap: React.FC = () => {
  const { latitude, longitude } = useLocationUser();
  const [ngos, setNgos] = useState<Ngos[]>([]);

  const { latitude: InitialPositionLat, longitude: InitialPositionLong } =
    useLocationUser();

  useEffect(() => {
    ngosMap();
  }, []);

  async function ngosMap() {
    const token = localStorage.getItem("@Evoluir:token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/ngos/map");
    setNgos(response.data);
  }

  return (
    <>
      <NavBar />
      <div className={styles.pageMap}>
        <Map
          center={[latitude, longitude]}
          style={{ width: "100%", height: "100vh" }}
          zoom={15}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {ngos.map((ngo) => {
            return (
              <Marker
                key={ngo.id}
                position={[ngo.latitude, ngo.longitude]}
                icon={mapIcon}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className="map-popup"
                >
                  {ngo.nome_fantasia}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/dir/?api=1&origin=${InitialPositionLat},${InitialPositionLong}&destination=${ngo.latitude},${ngo.longitude}`}
                    title="Ver no google maps"
                  >
                    <FiArrowRight size={32} color="#fff" />
                  </a>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      </div>
    </>
  );
};

export default PageMap;
