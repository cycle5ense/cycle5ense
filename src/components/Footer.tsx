import { Col, Container, Row } from 'react-bootstrap';
import { Facebook, Instagram, TwitterX, Tiktok } from "react-bootstrap-icons";
import Link from 'next/link';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-1" style={{ backgroundColor: "#2d4a2d", color: "#fff"}}>
    <Container>
      <Row className="py-3">
        <Col>
          <strong>Bottles4College Socials</strong>
          <hr />
          <Row>
          <div>
            <a
              href="https://www.facebook.com/bottles4college"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 mt-2 footer-social-nav-link"
            >
            <Facebook /> Facebook
            </a>
          </div>
          </Row>
          <Row>
          <div>
            <a
              href="https://www.instagram.com/bottles4college"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 mt-2 footer-social-nav-link"
            >
            <Instagram /> Instagram
            </a>
          </div>
          </Row>
          <Row>
          <div>
            <a
              href="https://x.com/bottles4college"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 mt-2 footer-social-nav-link"
            >
            <TwitterX /> Twitter / X
            </a>
          </div>
          </Row>
          <Row>
          <div>
            <a
              href="https://www.tiktok.com/@bottles4college"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 mt-2 footer-social-nav-link"
            >
            <Tiktok /> TikTok
            </a>
          </div>
          </Row>
        </Col>
        <Col>
          <strong>Site Navigation</strong>
          <hr />
          <div className="d-flex flex-column gap-2">
          <div>
            <Link href="/" className="footer-nav-link">
              Home
            </Link>
          </div>
          <div>
            <Link href="/announcements" className="footer-nav-link">
              Bottles4College Announcements
            </Link>
          </div>
          <div>
            <Link href="/map" className="footer-nav-link">
              Manoa Bin Map
            </Link>
          </div>
          <div>
            <Link href="/sorting-guide" className="footer-nav-link">
              Sorting Guide
            </Link>
          </div>
          <div>
            <Link href="/recycle-statistics" className="footer-nav-link">
              Recycling Statistics
            </Link>
          </div>
          </div>
        </Col>
        <Col lg={4}>
          <strong>About Us</strong>
          <hr />
            <p className="mb-4" style={{ color: 'var(--color-link)' }}>
              Cycle5ense helps the UH Mānoa community recycle smarter by making campus
              recycling information easier to access.
            </p>
            <div className="mb-3" style={{ color: 'var(--color-link)' }}>
            <div className="fw-semibold">University of Hawaiʻi at Mānoa</div>
            <div className="fw-semibold">Honolulu, HI 96822</div>
            </div>
        </Col>
      </Row>
    </Container>
      <div className="text-center small mt-1 pb-2" style={{ color: 'var(--color-green-light)' }}>
      © 2026 Cycle5ense | Built to support sustainability at UH Mānoa
    </div>
  </footer>
);

export default Footer;
