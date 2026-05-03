import { notFound } from 'next/navigation';
import { Announcement } from '@prisma/client';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditAnnouncementForm from '@/components/EditAnnouncementForm';

export default async function EditAnnouncementPage({ params }: { params: { id: string | string[] } }) {
  const { id } = await params;
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const editID: number = +id;
  const announcement: Announcement | null = await prisma.announcement.findUnique({
    where: {
      id: editID,
    },
  });
  if (!announcement) {
    return notFound();
  }

  return (
    <main>
      <EditAnnouncementForm announcement={announcement} />
    </main>
  );
}