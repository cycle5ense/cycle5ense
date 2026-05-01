import { Card, Col, Container, Row } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { adminProtectedPage } from '@/lib/page-protection';
import { getAllUsersWithRecyclingTotals } from '@/lib/dbActions';
import AdminUserTable from '@/components/AdminUserTable';

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

        <AdminUserTable users={users} currentAdminEmail={session?.user?.email ?? ''} />
      </Container>
    </main>
  );
};

export default AdminPage;
