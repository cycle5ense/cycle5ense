import { loggedInProtectedPage } from '@/lib/page-protection';
import AddAnnouncementForm from '@/components/AddAnnouncementForm';
import { Container } from 'react-bootstrap';
import { auth } from '@/lib/auth';

const AddAnnouncement = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  return (
    <main>
      <Container className="py-4 mt-5 pt-5">
        <h1 className="fw-bold mb-3">Add Announcement</h1>
        <p className="mb-4">
          Enter information for a new Bottles4College announcement or event.
        </p>
        <AddAnnouncementForm />
      </Container>
    </main>
  );
};

export default AddAnnouncement;
