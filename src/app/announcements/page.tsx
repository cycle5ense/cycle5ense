import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import Image from "next/image";

const AnnouncementsPage = async () => {
  return (
    <main className="pt-4">
      {/* Hero / Org Description */}
      <div className="pt-5 pb-3">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-2">
                <span>♻️</span>
                <Image
                  src="/img/bottles4college-logo.avif"
                  alt="Bottles4College logo"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
                <div className="d-flex align-items-center gap-2">
                  <h1 className="mb-0">
                    Bottles4College
                  </h1>
                  <Badge bg="warning" text="dark" className="ms-2">
                    501(c)(3)
                  </Badge>
                </div>
              </div>
              <p className="mb-0">
                A multi-award winning nonprofit that collects recyclable cans and bottles to help protect the planet
                and fund college scholarships for kids in Hawaiʻi.
              </p>
              <hr className="my-2" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Page heading */}
      <Container className="pt-2 pb-4">
        <Row className="mb-3">
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
        <Row className="align-items-stretch">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-sm overflow-hidden h-100">
              <div style={{ height: "6px", background: "linear-gradient(90deg, #28a745, #ffc107)" }} />
              <CardBody className="p-4 d-flex flex-column">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Badge bg="success" className="px-3 py-2">
                    🗓 Upcoming Event
                  </Badge>
                </div>
                <CardTitle className="mb-3">
                  Aloha ʻĀina Fair (Bottles4College Collection Drive)
                </CardTitle>
                <CardText>
                  Join Bottles4College at the Aloha ʻĀina Fair this Saturday at Windward Mall! We’ll be hosting a recycling collection drive—bring your cans and bottles to support sustainability efforts while helping fund local student scholarships. Stop by to learn more about proper recycling and how you can make an impact in your community.
                </CardText>
                <div className="d-flex gap-4 flex-wrap pt-3 mt-auto" style={{ borderTop: "1px solid var(--color-bg-alt)" }}>
                  <span>📅 Saturday, April 18, 2026</span>
                  <span>🕘 8:00 AM – 4:00 PM</span>
                  <span>📍 Windward Mall, Kāneʻohe</span>
                </div>
                <div className="pt-4">
                  <a
                    href="https://bottles4college.com/pages/aloha-%CA%BBaina-fair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success"
                  >
                    Learn More
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={4} lg={6}>
            <div className="h-100">
              <Image
                src="/img/b4c-community.webp"
                alt="Bottles4College community"
                width={800}
                height={600}
                className="w-100 h-100"
                style={{ objectFit: "cover", borderRadius: "0.5rem" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AnnouncementsPage;
