import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import Image from "next/image";
import { getAnnouncements } from "@/lib/dbActions";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const AnnouncementsPage = async () => {
  const announcements = await getAnnouncements();
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

        {/* Announcement cards */}
        {announcements.length === 0 ? (
          <p className="text-muted">No announcements yet.</p>
        ) : (
          <Row className="g-4">
            {announcements.map((announcement) => (
              <Col md={8} lg={6} key={announcement.id}>
                <Card className="border-0 shadow-sm overflow-hidden h-100">
                  <div style={{ height: "6px", background: "linear-gradient(90deg, #28a745, #ffc107)" }} />
                  <CardBody className="p-4 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Badge bg="success" className="px-3 py-2">
                        🗓 Upcoming Event
                      </Badge>
                    </div>
                    <CardTitle className="mb-3">
                      {announcement.name}
                    </CardTitle>
                    <CardText>
                      {announcement.description}
                    </CardText>
                    <div
                      className="d-flex gap-4 flex-wrap pt-3 mt-auto"
                      style={{ borderTop: "1px solid var(--color-bg-alt)" }}
                    >
                      <span>📅 {formatDate(announcement.date)}</span>
                      <span>🕘 {formatTime(announcement.timeStart)} – {formatTime(announcement.timeEnd)}</span>
                      <span>📍 {announcement.location}</span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        
      </Container>
    </main>
  );
};

export default AnnouncementsPage;
