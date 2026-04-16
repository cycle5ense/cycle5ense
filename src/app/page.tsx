import { Col, Container, Row, Card, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container fluid className="bg-success text-white pt-5 pb-5 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={7}>
            <h1 className="display-4 fw-bold mb-3">Cycle5ense</h1>
            <p className="lead mb-0">
              Cycle5ense helps the Manoa community recycle more confidently by bringing together
              campus recycling tools, guidance, announcements, and impact information in one place.
            </p>
          </Col>

          <Col lg={5} className="mt-4 mt-lg-0">
            <Card className="shadow-sm border-0">
              <div className="card-body text-dark">
                <h3 className="fw-bold mb-3">Why Use Cycle5ense?</h3>
                <p className="mb-3">
                  Many in the Manoa community want to recycle but, they may not always know where
                  bins are located or how items should be sorted.
                </p>
                <p className="mb-0">
                  This website brings that information together in one simple and
                  accessible place.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>

    <Container className="py-5">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="fw-bold">What the Website Offers</h2>
          <p className="text-muted mb-0">
            A preview of the tools and information available on Cycle5ense.
          </p>
        </Col>
      </Row>

<Row className="g-4">
      <Col md={6} lg={3}>
        <Card className="h-100 shadow-sm border-0">
          <div className="card-body">
            <h4 className="fw-bold">Bottles4College Announcements</h4>
            <p className="text-muted mb-0">
              Stay updated with recycling-related news, events, and campus updates.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="h-100 shadow-sm border-0">
          <div className="card-body">
            <h4 className="fw-bold">Manoa Bin Map</h4>
            <p className="text-muted mb-0">
              Find recycling bin locations around campus more easily.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="h-100 shadow-sm border-0">
          <div className="card-body">
            <h4 className="fw-bold">Sorting Guide</h4>
            <p className="text-muted mb-0">
              Learn more about how to sort recyclable materials correctly.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="h-100 shadow-sm border-0">
          <div className="card-body">
            <h4 className="fw-bold">Recycling Impact Statistics</h4>
            <p className="text-muted mb-0">
              View recycling impact data and annual progress.
            </p>
          </div>
        </Card>
      </Col>
      </Row>
    </Container>

    <Container fluid className="py-5 bg-light">
      <Container>
        <Row className="g-4">
          <Col lg={6}>
            <Card className="h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="fw-bold mb-3">Our Unique Focus</h2>
                <p className="mb-3">
                  Cycle5ense gives users one central place to access campus recycling
                  information instead of searching across multiple sources.
                </p>
                <p className="mb-0">
                  Users can learn how to recycle correctly, find locations, check updates,
                  and view impact statistics all in one website.
                </p>
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="fw-bold mb-3">Site Goals</h2>
                <p className="mb-2">• Make recycling easier to understand</p>
                <p className="mb-2">• Help users find recycling locations on campus</p>
                <p className="mb-2">• Encourage correct sorting habits</p>
                <p className="mb-2">• Show recycling impact over time</p>
                <p className="mb-0">• Support future site growth</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>

    <Container fluid className="py-5 bg-dark text-white">
      <Container>
        <Row className="align-items-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-3">Admin Access</h2>
            <p className="mb-0">
              The site will later support an admin sign-in for authorized users who
              update announcements, recycling information, and statistics.
            </p>
          </Col>

          <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
            <Button variant="warning" size="lg" disabled>
              Admin Sign In Coming Soon
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
