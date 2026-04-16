'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === 'loading') return null;

  const currentUser = session?.user?.email;
  const role = session?.user?.role;

  return (
    <Navbar bg="light" expand="lg" className="border-bottom py-2">
      <Container>
        <Navbar.Brand href="/" className="fw-normal me-4">
          <img src="/img/cycle5ense-logo.png" alt="CycleSense Logo" height="40" />
          CycleSense
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-lg-center">
            <Nav.Link
              id="announcements"
              href="/announcements"
              active={pathName === '/announcements'}
              className="mx-lg-2"
            >
              Bottles4College Announcements
            </Nav.Link>

            <Nav.Link
              id="map"
              href="/map"
              active={pathName === '/map'}
              className="mx-lg-2"
            >
              Manoa Bin Map
            </Nav.Link>

            <Nav.Link
              id="find-bin"
              href="/find-bin"
              active={pathName === '/find-bin'}
              className="mx-lg-2"
            >
              Recycle Bin Finder
            </Nav.Link>

            <Nav.Link
              id="sorting-guide"
              href="/sorting-guide"
              active={pathName === '/sorting-guide'}
              className="mx-lg-2"
            >
              Sorting Guide
            </Nav.Link>

            <Nav.Link
              id="recycle-statistics"
              href="/recycle-statistics"
              active={pathName === '/recycle-statistics'}
              className="mx-lg-2"
            >
              Recycling Impact Statistics
            </Nav.Link>

            {role === 'ADMIN' && (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                active={pathName === '/admin'}
                className="mx-lg-2"
              >
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-lg-center">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser ?? 'Account'}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
