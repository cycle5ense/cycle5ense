import { Card, Col, Container, Row } from 'react-bootstrap';
import CircularGallery from '@/components/CircularGallery';
import Image from 'next/image';

export default function SortingGuidePage() {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Sorting Guide</h1>

      <Row className="align-items-center g-4 mb-5">
        <Col md={4}>
          <Card
            className="h-100 shadow-sm"
            style={{ backgroundColor: '#e6f4ff', border: '3px solid #007fff' }}
          >
            <div className="card-body text-center">
              <h5 className="fw-bold text-center mb-3">RECYCLABLES GO HERE</h5>
              <p className="mb-0 text-start">
                The recycling bins are self explanatory and easy to use. Place clean bottles,
                cans, paper, and other accepted recyclable items into the opening labeled
                recyclables.
              </p>
            </div>
          </Card>
        </Col>

        <Col md={4} className="text-center">
          <Image
            src="/img/bin-sort.jpg"
            alt="Campus recycling bin with separate openings for recyclables and waste"
            width={500}
            height={300}
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col md={4}>
          <Card
            className="h-100 shadow-sm"
            style={{ backgroundColor: '#d9d9d9', border: '3px solid #000000' }}
          >
            <div className="card-body text-center">
              <h5 className="fw-bold text-center mb-3">WASTE GOES HERE</h5>
              <p className="mb-0 text-start">
                Waste, also known as non recyclable material, should be placed in the side
                labeled waste. This includes food-soiled items, wrappers, and materials that
                cannot be recycled.
              </p>
            </div>
          </Card>
        </Col>
      </Row>

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

      <h2 className="fw-bold mb-4 text-start">What to Recycle:</h2>
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
              <h5 className="fw-bold">Aluminium</h5>
              <p className="mb-0">
                Aluminium cans are highly recyclable and should be placed in the appropriate
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
