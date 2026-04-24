import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { adminProtectedPage } from '@/lib/page-protection';
import {
  adminDeleteUser,
  adminResetUserPassword,
  getAllUsersWithRecyclingTotals,
} from '@/lib/dbActions';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(session);

  const users = await getAllUsersWithRecyclingTotals();

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === 'ADMIN').length;
  const totalNormalUsers = users.filter((user) => user.role === 'USER').length;
  const totalRecycledItems = users.reduce((sum, user) => sum + user.recycledTotal, 0);

  return (
    <main className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">Admin User Management</h1>
            <p className="text-muted mb-0">
              View users, reset passwords, and delete user profiles. Deleting a profile also removes
              that user&apos;s recycling entries from the statistics totals.
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Total Users</h5>
                <p className="fs-4 mb-0">{totalUsers}</p>
              </div>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Admins</h5>
                <p className="fs-4 mb-0">{totalAdmins}</p>
              </div>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Normal Users</h5>
                <p className="fs-4 mb-0">{totalNormalUsers}</p>
              </div>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="shadow-sm h-100">
              <div className="card-body">
                <h5 className="fw-bold">Items Recycled</h5>
                <p className="fs-4 mb-0">{totalRecycledItems.toLocaleString()}</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-3">All Users</h4>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Recycled Items</th>
                      <th>Reset Password</th>
                      <th>Delete Profile</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.firstName || 'Not set'}</td>
                        <td>{user.lastName || 'Not set'}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.recycledTotal.toLocaleString()}</td>

                        <td>
                          <form action={adminResetUserPassword} className="d-flex gap-2">
                            <input type="hidden" name="userId" value={user.id} />
                            <input
                              name="newPassword"
                              type="text"
                              minLength={6}
                              placeholder="New password"
                              className="form-control form-control-sm"
                              required
                            />
                            <Button type="submit" size="sm" variant="warning">
                              Reset
                            </Button>
                          </form>
                        </td>

                        <td>
                          <form action={adminDeleteUser}>
                            <input type="hidden" name="userId" value={user.id} />
                            <Button
                              type="submit"
                              size="sm"
                              variant="danger"
                              disabled={session?.user?.email === user.email}
                            >
                              Delete
                            </Button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <p className="text-muted mb-0">
                  Admin accounts cannot delete themselves from this page.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
