'use client';

import { useMemo, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { adminDeleteUser, adminResetUserPassword } from '@/lib/dbActions';

type AdminUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  recycledTotal: number;
};

type AdminUserTableProps = {
  users: AdminUser[];
  currentAdminEmail: string;
};

const USERS_PER_PAGE = 10;

const AdminUserTable = ({ users, currentAdminEmail }: AdminUserTableProps) => {
  const [searchEmail, setSearchEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const search = searchEmail.trim().toLowerCase();

    if (!search) {
      return users;
    }

    return users.filter((user) => user.email.toLowerCase().includes(search));
  }, [searchEmail, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * USERS_PER_PAGE,
    safeCurrentPage * USERS_PER_PAGE,
  );

  const handleSearchChange = (value: string) => {
    setSearchEmail(value);

    const search = value.trim().toLowerCase();

    if (!search) {
      setCurrentPage(1);
      return;
    }

    const matchingIndex = users.findIndex((user) => user.email.toLowerCase().includes(search));

    if (matchingIndex === -1) {
      setCurrentPage(1);
      return;
    }

    const matchingPage = Math.floor(matchingIndex / USERS_PER_PAGE) + 1;
    setCurrentPage(matchingPage);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <Row>
      <Col>
        <Card className="shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
              <div>
                <h4 className="fw-bold mb-1">All Users</h4>
                <p className="text-muted mb-0">
                  Showing {pageUsers.length} of {filteredUsers.length} matching users.
                </p>
              </div>

              <div style={{ minWidth: '320px' }}>
                <label htmlFor="adminUserEmailSearch" className="form-label fw-bold">
                  Search by Email
                </label>
                <input
                  id="adminUserEmailSearch"
                  type="text"
                  value={searchEmail}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Enter user email"
                  className="form-control"
                />
              </div>
            </div>

            <div
              className="table-responsive"
              style={{
                maxHeight: '560px',
                overflowY: 'auto',
                border: '1px solid #dee2e6',
              }}
            >
              <Table striped bordered hover className="mb-0">
                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <tr>
                    <th className="bg-white">First Name</th>
                    <th className="bg-white">Last Name</th>
                    <th className="bg-white">Email</th>
                    <th className="bg-white">Role</th>
                    <th className="bg-white">Recycled Items</th>
                    <th className="bg-white">Reset Password</th>
                    <th className="bg-white">Delete Profile</th>
                  </tr>
                </thead>

                <tbody>
                  {pageUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    pageUsers.map((user) => (
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
                              disabled={currentAdminEmail === user.email}
                            >
                              Delete
                            </Button>
                          </form>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-3">
              <p className="text-muted mb-0">
                Page {safeCurrentPage} of {totalPages}. Admin accounts cannot delete themselves from
                this page.
              </p>

              <div className="d-flex gap-2">
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={goToPreviousPage}
                  disabled={safeCurrentPage === 1}
                >
                  Previous
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={goToNextPage}
                  disabled={safeCurrentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminUserTable;
