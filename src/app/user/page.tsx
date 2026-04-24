import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { userProtectedPage } from '@/lib/page-protection';
import {
  addRecyclingEntry,
  getCurrentUser,
  getCurrentUserRecyclingEntries,
  getCurrentUserRecyclingTotal,
  updateCurrentUserProfile,
} from '@/lib/dbActions';

const UserPage = async () => {
  const session = await auth();
  userProtectedPage(session);

  const user = await getCurrentUser();
  const entries = await getCurrentUserRecyclingEntries();
  const total = await getCurrentUserRecyclingTotal();

  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();

  return (
    <main className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">
              Hello, {fullName || user?.email}
            </h1>
            <p className="text-muted mb-0">
              Track the number of bottles and cans you recycle. Each submission updates your
              personal total and the recycling statistics page.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Your Profile</h4>
                <p className="mb-2">
                  <strong>First Name:</strong> {user?.firstName || 'Not set'}
                </p>
                <p className="mb-2">
                  <strong>Last Name:</strong> {user?.lastName || 'Not set'}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Your Recycling Total</h4>
                <p className="display-6 mb-2">{total.toLocaleString()}</p>
                <p className="text-muted mb-0">Total items you have recycled so far.</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Update Your Name</h4>
                <form action={updateCurrentUserProfile}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue={user?.firstName ?? ''}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue={user?.lastName ?? ''}
                      className="form-control"
                      required
                    />
                  </div>

                  <Button type="submit">Save Profile</Button>
                </form>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Add Recycling Entry</h4>
                <form action={addRecyclingEntry}>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                      Number of Items Recycled
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Enter number of bottles or cans"
                      className="form-control"
                      required
                    />
                  </div>
                  <Button type="submit">Add Recycling Entry</Button>
                </form>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">Your Recycling History</h4>
                {entries.length === 0 ? (
                  <p className="mb-0">You have not added any recycling entries yet.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Entry</th>
                        <th>Items Recycled</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, index) => (
                        <tr key={entry.id}>
                          <td>{entries.length - index}</td>
                          <td>{entry.amount.toLocaleString()}</td>
                          <td>{new Date(entry.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserPage;
