'use server';

import { Pin, RecyclingEntry, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { auth } from './auth';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: firstName, lastName, email, password.
 */
export async function createUser(credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Updates the current user's first and last name.
 */
export async function updateCurrentUserProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const firstNameValue = formData.get('firstName');
  const lastNameValue = formData.get('lastName');

  const firstName = typeof firstNameValue === 'string' ? firstNameValue.trim() : '';
  const lastName = typeof lastNameValue === 'string' ? lastNameValue.trim() : '';

  if (!firstName || !lastName) {
    return;
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      firstName,
      lastName,
    },
  });

  revalidatePath('/user');
}

/**
 * Returns all pins.
 */
export async function getPins(): Promise<Pin[]> {
  return prisma.pin.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

/**
 * Adds a new pin.
 */
export async function addPin(data: {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}) {
  await prisma.pin.create({
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
      description: data.description,
    },
  });

  revalidatePath('/map');
  revalidatePath('/edit-pins');
  revalidatePath('/add-pin');
}

/**
 * Updates an existing pin.
 */
export async function updatePin(data: {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}) {
  await prisma.pin.update({
    where: { id: data.id },
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      name: data.name,
      description: data.description,
    },
  });

  revalidatePath('/map');
  revalidatePath('/edit-pins');
}

/**
 * Removes a pin by id.
 */
export async function removePin(id: number) {
  await prisma.pin.delete({
    where: { id },
  });

  revalidatePath('/map');
  revalidatePath('/edit-pins');
}

/**
 * Adds a new announcement.
 */
export async function addAnnouncement(data: {
  name: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  location: string;
  description: string;
}) {
  const dateBase = data.date;

  await prisma.announcement.create({
    data: {
      name: data.name,
      timeStart: new Date(`${dateBase}T${data.timeStart}`),
      timeEnd: new Date(`${dateBase}T${data.timeEnd}`),
      date: new Date(dateBase),
      location: data.location,
      description: data.description,
    },
  });
  redirect('/list');
}

/**
 * Edits an announcement.
 */
export async function editAnnouncement(data: {
  id: number;
  name: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  location: string;
  description: string;
}) {
  const dateBase = data.date;

  await prisma.announcement.update({
    where: { id: data.id },
    data: {
      name: data.name,
      timeStart: new Date(`${dateBase}T${data.timeStart}`),
      timeEnd: new Date(`${dateBase}T${data.timeEnd}`),
      date: new Date(dateBase),
      location: data.location,
      description: data.description,
    },
  });
  redirect('/list');
}

export async function getAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: {
      date: 'asc',
    },
  });
}

/**
 * Returns the currently logged in user.
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

/**
 * Adds a recycling entry for the currently logged in user.
 */
export async function addRecyclingEntry(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  const amountValue = formData.get('amount');
  const amount = Number(amountValue);

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  await prisma.recyclingEntry.create({
    data: {
      amount,
      userId: user.id,
    },
  });

  revalidatePath('/user');
  revalidatePath('/recycle-statistics');
}

/**
 * Returns all recycling entries for the current user.
 */
export async function getCurrentUserRecyclingEntries(): Promise<RecyclingEntry[]> {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return [];
  }

  return prisma.recyclingEntry.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Returns the total recycled item count for the current user.
 */
export async function getCurrentUserRecyclingTotal(): Promise<number> {
  const session = await auth();

  if (!session?.user?.email) {
    return 0;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return 0;
  }

  const result = await prisma.recyclingEntry.aggregate({
    where: { userId: user.id },
    _sum: {
      amount: true,
    },
  });

  return result._sum.amount ?? 0;
}

/**
 * Returns overall recycling statistics across all users.
 */
export async function getOverallRecyclingStats() {
  const totalItemsResult = await prisma.recyclingEntry.aggregate({
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
  });

  const totalUsers = await prisma.user.count();

  const currentYear = new Date().getFullYear();
  const yearStart = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  const nextYearStart = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);

  const currentYearResult = await prisma.recyclingEntry.aggregate({
    where: {
      createdAt: {
        gte: yearStart,
        lt: nextYearStart,
      },
    },
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
  });

  return {
    totalItems: totalItemsResult._sum.amount ?? 0,
    totalEntries: totalItemsResult._count.id ?? 0,
    totalUsers,
    currentYear,
    currentYearItems: currentYearResult._sum.amount ?? 0,
    currentYearEntries: currentYearResult._count.id ?? 0,
  };
}
export async function getAllUsersWithRecyclingTotals() {
  const users = await prisma.user.findMany({
    orderBy: {
      email: 'asc',
    },
    include: {
      recyclingEntries: true,
    },
  });

  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    recycledTotal: user.recyclingEntries.reduce((sum, entry) => sum + entry.amount, 0),
  }));
}

export async function adminResetUserPassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email || session.user.role !== 'ADMIN') {
    redirect('/not-authorized');
  }

  const userIdValue = formData.get('userId');
  const newPasswordValue = formData.get('newPassword');

  const userId = Number(userIdValue);
  const newPassword = typeof newPasswordValue === 'string' ? newPasswordValue.trim() : '';

  if (!Number.isFinite(userId) || !newPassword || newPassword.length < 6) {
    return;
  }

  const password = await hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password },
  });

  revalidatePath('/admin');
}

export async function adminDeleteUser(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email || session.user.role !== 'ADMIN') {
    redirect('/not-authorized');
  }

  const userIdValue = formData.get('userId');
  const userId = Number(userIdValue);

  if (!Number.isFinite(userId)) {
    return;
  }

  const currentAdmin = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (currentAdmin?.id === userId) {
    return;
  }

  await prisma.recyclingEntry.deleteMany({
    where: { userId },
  });

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath('/admin');
  revalidatePath('/recycle-statistics');
}