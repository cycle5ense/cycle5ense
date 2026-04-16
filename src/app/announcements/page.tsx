import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardText } from "react-bootstrap";

const AnnouncementsPage = async () => {
  return (
    <main>
      {/* Hero / Org Description */}
      <div className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span>♻️</span>
                <h1 className="mb-0">
                  Bottles4College
                </h1>
                <Badge bg="warning" text="dark" className="ms-2">
                  501(c)(3)
                </Badge>
              </div>
              <p className="mb-0">
                A multi-award winning nonprofit that collects recyclable cans and bottles to help protect the planet
                and fund college scholarships for kids in Hawaiʻi.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Page heading */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2>
              Announcements &amp; Events
            </h2>
            <p className="text-muted mt-2">
              Stay up to date with the latest from Bottles4College.
            </p>
          </Col>
        </Row>

        {/* Event card */}
        <Row>
          <Col md={8} lg={6}>
            <Card className="border-0 overflow-hidden">
              <div/>
              <CardBody className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Badge>
                    🗓 Upcoming Event
                  </Badge>
                </div>
                <CardTitle>
                  Beach Cleanup at Ala Moana Beach Park
                </CardTitle>
                <CardText>
                  Help us protect our environment by collecting recyclable bottles and cans while supporting a
                  cleaner Hawaiʻi. Every item collected makes a difference — for our island and for a student&apos;s future.
                </CardText>
                <div className="d-flex gap-4 flex-wrap pt-3" style={{ borderTop: "1px solid var(--color-bg-alt)" }}>
                  <span>📅 April 20, 2025</span>
                  <span>🕘 9:00 AM – 12:00 PM</span>
                  <span>📍 Ala Moana Beach Park</span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AnnouncementsPage;