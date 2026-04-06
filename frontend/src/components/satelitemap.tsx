import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
};

export default function FarmMap({ setLat, setLng }: Props) {

  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([10.7905, 79.1378], 13);

    // Normal map
    const normalMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: "&copy; OpenStreetMap contributors" }
    );

    // Satellite map
    const satelliteMap = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles © Esri" }
    );

    normalMap.addTo(map);

    // Layer switch control
    L.control.layers(
      {
        "Normal Map": normalMap,
        "Satellite": satelliteMap
      }
    ).addTo(map);

    map.on("click", (e) => {

      const { lat, lng } = e.latlng;

      setLat(lat);
      setLng(lng);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(map);
      }

    });

    mapRef.current = map;

  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
}