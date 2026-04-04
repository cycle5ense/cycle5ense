'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Next.js Application Template</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link id="announcements" href="/announcements" active={pathName === '/announcements'}>
                  Bottles4College Announcements
                </Nav.Link>
                <Nav.Link id="map" href="/map" active={pathName === '/map'}>
                  Manoa Bin Map
                </Nav.Link>
                <Nav.Link id="find-bin" href="/find-bin" active={pathName === '/find-bin'}>
                  Recycle Bin Finder
                </Nav.Link>
                <Nav.Link id="sorting-guide" href="/sorting-guide" active={pathName === '/sorting-guide'}>
                  Sorting Guide
                </Nav.Link>
                <Nav.Link id="recycle-statistics" href="/recycle-statistics" active={pathName === '/recycle-statistics'}>
                  Recycling Impact Statistics
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
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
