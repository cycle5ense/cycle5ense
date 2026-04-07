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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">CycleSense</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT SIDE LINKS (ALWAYS VISIBLE) */}
          <Nav className="me-auto">

            <Nav.Link href="/announcements" active={pathName === '/announcements'}>
              Bottles4College Announcements
            </Nav.Link>

            <Nav.Link href="/map" active={pathName === '/map'}>
              Manoa Bin Map
            </Nav.Link>

            <Nav.Link href="/find-bin" active={pathName === '/find-bin'}>
              Recycle Bin Finder
            </Nav.Link>

            <Nav.Link href="/sorting-guide" active={pathName === '/sorting-guide'}>
              Sorting Guide
            </Nav.Link>

            <Nav.Link href="/recycle-statistics" active={pathName === '/recycle-statistics'}>
              Recycling Impact Statistics
            </Nav.Link>

            {role === 'ADMIN' && (
              <Nav.Link href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}

          </Nav>

          {/* RIGHT SIDE LOGIN */}
          <Nav>
            {session ? (
              <NavDropdown title={currentUser ?? 'Account'}>
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight /> Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock /> Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill /> Sign up
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
