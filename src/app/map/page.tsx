import { Container } from 'react-bootstrap';
import LeafletMap from '@/components/LeafletMap';

const MapPage = () => {
  return (
    <Container className="py-4">
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
