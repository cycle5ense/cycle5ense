'use client';

import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const MapPage = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Manoa Bin Map</h1>

      <p className="mb-4">
        This page shows recycling bin locations on an interactive campus map. Click a marker to
        view location details.
      </p>

      <LeafletMap />
    </Container>
  );
};

export default MapPage;