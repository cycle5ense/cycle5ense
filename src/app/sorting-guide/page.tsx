import { Card, Col, Container, Row } from 'react-bootstrap';
import CircularGallery from '@/components/CircularGallery';

export default function SortingGuidePage() {
  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-3">Sorting Guide</h1>
      <p className="mb-4">
        This page is a mockup showing how CycleSense can help users identify common recyclable
        materials and sort them properly on the UH Mānoa campus.
      </p>

      <div style={{ height: '500px', position: 'relative', marginBottom: '2rem' }}>
        <CircularGallery 
          items={[
            { image: '/img/bottles.webp', text: 'Plastic Bottles' },
            { image: '/img/bottles2.jpg', text: 'Bottom of Plastic Bottles' },
            { image: '/img/cans.jpg', text: 'Aluminum Cans' },
            { image: '/img/cans2.jpg', text: 'More Cans' },
            { image: '/img/glass.png', text: 'Glass Bottles' },
            { image: '/img/glass2.jpg', text: 'More Glass' },
            { image: '/img/recyclable.jpg', text: 'Recyclables' },
          ]}
          bend={4}
          textColor="#ffffff"
          borderRadius={0.09}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Plastic</h5>
              <p className="mb-0">
                Recycle plastic bottles and containers when they are empty and reasonably clean.
                Avoid placing food filled containers into recycling bins.
              </p>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Glass</h5>
              <p className="mb-0">
                Glass bottles and jars may be accepted at certain locations. Check signage and make
                sure glass items are emptied before disposal.
              </p>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Aluminum</h5>
              <p className="mb-0">
                Aluminum cans are highly recyclable and should be placed in the appropriate
                recycling bins around campus whenever possible.
              </p>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Not Recyclable</h5>
              <p className="mb-0">
                Items with leftover food, mixed materials, or nonrecyclable packaging should go in
                the trash instead of campus recycling bins.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
