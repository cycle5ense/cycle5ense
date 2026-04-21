'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

type Pin = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
};

type MapClientProps = {
  pins: Pin[];
  isAdmin?: boolean;
};

const MapClient = ({ pins, isAdmin = false }: MapClientProps) => {
  return <LeafletMap pins={pins} isAdmin={isAdmin} />;
};

export default MapClient;
