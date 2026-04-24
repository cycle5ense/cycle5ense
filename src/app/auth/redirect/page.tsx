import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

const AuthRedirectPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin');
  }

  redirect('/user');
};

export default AuthRedirectPage;
