import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { getOverallRecyclingStats } from '@/lib/dbActions';

const RecycleStatisticsPage = async () => {
  const stats = await getOverallRecyclingStats();

  return (
    <main className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">Recycling Impact Statistics</h1>
            <p className="text-muted">
              This page now reflects recycling totals submitted by Cycle5ense users. As more users
              log their recycled bottles and cans, the totals shown here will automatically update.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">Total Registered Users</h5>
                <p className="fs-4 mb-0">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">Total Recycling Entries</h5>
                <p className="fs-4 mb-0">{stats.totalEntries.toLocaleString()}</p>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">Total Items Recycled</h5>
                <p className="fs-4 mb-0">{stats.totalItems.toLocaleString()}</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Current Year</h5>
                <p className="fs-4 mb-0">{stats.currentYear}</p>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Items Recycled This Year</h5>
                <p className="fs-4 mb-0">{stats.currentYearItems.toLocaleString()}</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <div className="card-body">
                <h5 className="mb-3">Current System Summary</h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Registered Users</td>
                      <td>{stats.totalUsers.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Total Recycling Entries</td>
                      <td>{stats.totalEntries.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Total Items Recycled</td>
                      <td>{stats.totalItems.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>{stats.currentYear} Recycling Entries</td>
                      <td>{stats.currentYearEntries.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>{stats.currentYear} Items Recycled</td>
                      <td>{stats.currentYearItems.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm mt-4">
              <div className="card-body">
                <h5 className="mb-3">Information Insight</h5>
                <ul>
                  <li>These totals now update from real recycling entries created by signed in users.</li>
                  <li>Each new recycling submission on the profile page updates this statistics page.</li>
                  <li>This structure also supports expanding into future yearly reporting and trend analysis.</li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RecycleStatisticsPage;
