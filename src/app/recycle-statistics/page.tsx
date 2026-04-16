"use client";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const RecycleStatisticsPage = () => {
  const yearlyStatistics = [
    { year: 2021, recycledAmount: 5000 },
    { year: 2022, recycledAmount: 7000 },
    { year: 2023, recycledAmount: 9000 },
    { year: 2024, recycledAmount: 12000 },
  ];

  return (
    <main className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
          <h1 className="fw-bold">Recycling Impact Statistics</h1>
          <p className="text-muted">This page is a mockup showing how the website page can present recycling impact data over the years in simple and clear way. We will likely integrate information based on Bottles4College&apos;s data.</p>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold">Total Years Tracked</h5>
                <p className="fs-4 mb-0">4 Years</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold">Highest Recorded Year</h5>
                <p className="fs-4 mb-0">2024</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h5 className="fw-bold">Items Recycled</h5>
                <p className="fs-4 mb-0">2,000,000+</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Yearly Recycling Distribution</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Recycled Amount of Bottles/Cans</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyStatistics.map((stat) => (
                    <tr key={stat.year}>
                      <td>{stat.year}</td>
                      <td>{stat.recycledAmount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        <Row>
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h5 className="mb-3">Information Insight</h5>
              <ul>
                <li>The numbers above are just for demo purposes so far.</li>
                <li>We will integrate real data from sources in the future.</li>
                <li>We also are leaning toward including more detailed analysis and visualizations.</li>
              </ul>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </main>
    );
};

export default RecycleStatisticsPage;