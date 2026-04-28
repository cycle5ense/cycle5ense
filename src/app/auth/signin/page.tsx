'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    await signIn('credentials', {
      callbackUrl: '/auth/redirect',
      email,
      password,
    });
  };

  return (
    <main>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <h1 className="text-center">Sign In</h1>
            <Card>
              <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" name="email" type="text" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input id="password" name="password" type="password" className="form-control" />
                  </div>

                  <Button type="submit" className="mt-2 signin-btn">
                    Sign In
                  </Button>
                </form>
              </div>

              <div
                className="card-footer text-white"
                style={{ backgroundColor: '#2d4a2d' }}
              >
                Don&apos;t have an account? <Link href="/auth/signup" className="signup-link">Sign up</Link>
              </div>
            </Card>
          </Col>
        </Row>
        <style>
          {`
            .signup-link {
              color: #c8e6a0;
              text-decoration: none;
            }
            .signup-link:hover {
              color: #5b9bd5;
            }
            .signin-btn {
              background-color: #7aad6e;
              border: none;
              transition: background-color 0.2s ease;
            }
            .signin-btn:hover {
              background-color: #4a7c4a;
            }
          `}
        </style>
      </Container>
    </main>
  );
};

export default SignIn;
