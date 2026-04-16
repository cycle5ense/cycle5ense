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

const center: [number, number] = [21.2972, -157.8170];

const markerData = [
  {
    id: 1,
    position: [21.298334640012257, -157.81871936831024] as [number, number],
    title: 'Campus Center',
    description: 'Outside east entrance',
  },
  {
    id: 2,
    position: [21.298444955798594, -157.81749982128116] as [number, number],
    title: 'Kuykendall Hall',
    description: '3rd floor, west stairwell',
  },
  {
    id: 3,
    position: [21.297485778551213, -157.81628644705341] as [number, number],
    title: 'POST Building',
    description: 'Near building entrance',
  },
];

export default function LeafletMap() {
  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom
      style={{ height: '600px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markerData.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <strong>{marker.title}</strong>
            <br />
            {marker.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
