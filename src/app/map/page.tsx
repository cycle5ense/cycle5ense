import { Container } from 'react-bootstrap';
import { getPins } from '@/lib/dbActions';
import MapClient from '@/components/MapClient';

const MapPage = async () => {
  const pins = await getPins();

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Manoa Bin Map</h1>

      <p className="mb-4">
        This page shows recycling bin locations on an interactive campus map. Click a marker to
        view location details.
      </p>

      <MapClient pins={pins} />
    </Container>
  );
};

export default MapPage;
