import { Container } from 'react-bootstrap';
import { getPins } from '@/lib/dbActions';
import MapClient from '@/components/MapClient';
import { auth } from '@/lib/auth';

const MapPage = async () => {
  const [pins, session] = await Promise.all([getPins(), auth()]);
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Manoa Bin Map</h1>

      <p className="mb-4">
        This page shows recycling bin locations on an interactive campus map.
        {isAdmin ? ' Click anywhere on the map to add a new pin.' : ' Click a marker to view location details.'}
      </p>

      <MapClient pins={pins} isAdmin={isAdmin} />
    </Container>
  );
};

export default MapPage;
