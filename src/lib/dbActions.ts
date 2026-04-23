'use server';

import { Pin } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
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
export async function getAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: {
      date: 'asc',
    },
  });
}