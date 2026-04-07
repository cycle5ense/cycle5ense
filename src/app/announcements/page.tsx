import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardText } from "react-bootstrap";

const AnnouncementsPage = async () => {
  return (
    <main style={{ backgroundColor: "#f0f7f4", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>
      {/* Hero / Org Description */}
      <div style={{ backgroundColor: "#1a6b4a", color: "#fff", padding: "3rem 0 2.5rem" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span style={{ fontSize: "2rem" }}>♻️</span>
                <h1 style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: "2rem", marginBottom: 0 }}>
                  Bottles4College
                </h1>
                <Badge bg="warning" text="dark" className="ms-2" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                  501(c)(3)
                </Badge>
              </div>
              <p style={{ fontSize: "1.05rem", color: "#c8e6da", maxWidth: "620px", marginBottom: 0, lineHeight: 1.7 }}>
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
            <h2 style={{ fontFamily: "'Georgia', serif", color: "#1a6b4a", fontWeight: 700, fontSize: "1.5rem", borderBottom: "2px solid #a8d5bf", paddingBottom: "0.5rem", display: "inline-block" }}>
              Announcements &amp; Events
            </h2>
            <p className="text-muted mt-2" style={{ fontSize: "0.95rem" }}>
              Stay up to date with the latest from Bottles4College.
            </p>
          </Col>
        </Row>

        {/* Event card */}
        <Row>
          <Col md={8} lg={6}>
            <Card style={{ border: "none", borderRadius: "14px", boxShadow: "0 4px 20px rgba(26,107,74,0.10)", overflow: "hidden" }}>
              <div style={{ backgroundColor: "#1a6b4a", height: "6px" }} />
              <CardBody className="p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Badge style={{ backgroundColor: "#e8f5ee", color: "#1a6b4a", fontWeight: 600, fontSize: "0.78rem" }}>
                    🗓 Upcoming Event
                  </Badge>
                </div>
                <CardTitle style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: "1.25rem", color: "#14532d" }}>
                  Beach Cleanup at Ala Moana Beach Park
                </CardTitle>
                <CardText style={{ color: "#4b7a63", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Help us protect our environment by collecting recyclable bottles and cans while supporting a
                  cleaner Hawaiʻi. Every item collected makes a difference — for our island and for a student&apos;s future.
                </CardText>
                <div style={{ borderTop: "1px solid #e2f0eb", paddingTop: "1rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <span style={{ color: "#1a6b4a", fontWeight: 600, fontSize: "0.9rem" }}>📅 April 20, 2025</span>
                  <span style={{ color: "#1a6b4a", fontWeight: 600, fontSize: "0.9rem" }}>🕘 9:00 AM – 12:00 PM</span>
                  <span style={{ color: "#1a6b4a", fontWeight: 600, fontSize: "0.9rem" }}>📍 Ala Moana Beach Park</span>
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