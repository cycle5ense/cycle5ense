import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardText } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { getAnnouncements } from "@/lib/dbActions";

const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const ITEMS_PER_PAGE = 4;

const AdminAnnouncementsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const announcements = await getAnnouncements();
  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE);
  const paginated = announcements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
                  <h1 className="mb-0">Bottles4College</h1>
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

      <Container className="pt-2 pb-4">
        <Row className="mb-3">
          <Col>
            <h2>Announcements &amp; Events</h2>
            <p className="text-muted mt-2">
              Stay up to date with the latest from Bottles4College.
            </p>
          </Col>
          <Col md={4} className="text-end">
            <Link href="/add-announcement" className="btn btn-success">
              + Add Announcement
            </Link>
          </Col>
        </Row>

        {paginated.length === 0 ? (
          <p className="text-muted">No announcements yet.</p>
        ) : (
          <Row className="g-4">
            {paginated.map((announcement) => (
              <Col md={8} lg={6} key={announcement.id}>
                <Card className="border-0 shadow-sm overflow-hidden h-100">
                  <div style={{ height: "6px", background: "linear-gradient(90deg, #28a745, #ffc107)" }} />
                  <CardBody className="p-4 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Badge bg="success" className="px-3 py-2">
                        🗓 Upcoming Event
                      </Badge>
                    </div>
                    <CardTitle className="mb-3">{announcement.name}</CardTitle>
                    <CardText>{announcement.description}</CardText>
                    <div
                      className="d-flex gap-4 flex-wrap pt-3 mt-auto"
                      style={{ borderTop: "1px solid var(--color-bg-alt)" }}
                    >
                      <span>📅 {formatDate(announcement.date)}</span>
                      <span>🕘 {formatTime(announcement.timeStart)} – {formatTime(announcement.timeEnd)}</span>
                      <span>📍 {announcement.location}</span>
                      <Link
                      href={`/edit-announcement/${announcement.id}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      ✏️ Edit
                    </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Row className="mt-5">
            <Col className="d-flex justify-content-center align-items-center gap-3">
              {currentPage > 1 ? (
                <Link href={`?page=${currentPage - 1}`} className="btn btn-success">
                  ← Previous
                </Link>
              ) : (
                <button className="btn btn-success" disabled>← Previous</button>
              )}
              <span style={{ color: "var(--color-text)" }}>Page {currentPage} of {totalPages}</span>
              {currentPage < totalPages ? (
                <Link href={`?page=${currentPage + 1}`} className="btn btn-success">
                  Next →
                </Link>
              ) : (
                <button className="btn btn-success" disabled>Next →</button>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default AdminAnnouncementsPage;