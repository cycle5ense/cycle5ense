import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

export const loggedInProtectedPage = (
  session: { user: { email?: string | null; id?: string; name?: string | null; role?: string } } | null,
) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

export const userProtectedPage = (
  session: { user: { email?: string | null; id?: string; name?: string | null; role?: string } } | null,
) => {
  loggedInProtectedPage(session);

  if (session && session.user.role === Role.ADMIN) {
    redirect('/admin');
  }
};

export const adminProtectedPage = (
  session: { user: { email?: string | null; id?: string; name?: string | null; role?: string } } | null,
) => {
  loggedInProtectedPage(session);

  if (session && session.user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }
};
