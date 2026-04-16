'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Pin = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
};

type LeafletMapProps = {
  pins: Pin[];
};

const center: [number, number] = [21.2972, -157.8170];

export default function LeafletMap({ pins }: LeafletMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom
      style={{ height: '600px', width: '100%', borderRadius: '8px', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
          <Popup>
            <strong>{pin.name}</strong>
            <br />
            {pin.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
