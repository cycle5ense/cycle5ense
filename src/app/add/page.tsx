import { adminProtectedPage } from '@/lib/page-protection';
import AddPinForm from '@/components/AddPinForm';
import { auth } from '@/lib/auth';

const AddPin = async () => {
  // Protect the page, only logged in users can access it.
  // Note: Change so that only admin can access from the admin page!!!
  const session = await auth();
  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  return (
    <main>
      <AddPinForm />
    </main>
  );
};

export default AddPin;
