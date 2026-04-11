import Image from 'next/image';
import { Container } from 'react-bootstrap';

const MapPage = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Manoa Bin Map</h1>

      <p className="mb-4">
        This page is a mockup showing where recycling bins will be displayed on a campus map.
        Future versions will allow users to click on locations to view more details.
      </p>

      <Image
        src="/img/map-placeholder.png"
        alt="UH Mānoa campus map"
        width={1200}
        height={800}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      />
    </Container>
  );
};

export default MapPage;
