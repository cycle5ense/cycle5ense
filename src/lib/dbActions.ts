'use server';

import { Pin, Building } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';


/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
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
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function addPin(pin: {
  location: Building;
  floor: number;
  description: string;
  }) {
  const validBuildings: Building[] = [
  Building.Outside,
  Building.CampusCenter,
  Building.ArtBuilding,
  Building.HolmesHall,
  Building.KraussHall,
  Building.POST,
  Building.MarineScienceBuilding,
  Building.UniversityHealthServices,
  Building.KennedyTheatre,
  Building.KellerHall,
  Building.WatanabeHall,
  Building.HawaiiInstituteGeophysics,
  Building.PhysicalScienceBuilding,
  Building.InformationTechnologyCenter,
  Building.BilgerHall,
  Building.BilgerAddition,
  Building.SakamakiHall,
  Building.KuykendallHall,
  Building.KuykendallAnnex,
  Building.Building37,
  Building.MillerHall,
  Building.WarriorRecreationCenter,
  Building.AdminServicesBuilding1,
  Building.AdminServicesBuilding2,
  Building.HemmenwayHall,
  Building.BachmanHall,
  Building.DeanHall,
  Building.GartleyHall,
  Building.FutureStudentSuccessCenter,
  Building.ArchitectureBuilding,
  Building.AndrewsOutdoorTheatre,
  Building.HawaiiHall,
  Building.LifeSciencesBuilding,
  Building.MooreHall,
  Building.ParadisePalms,
  Building.HamiltonLibrary,
  Building.HamiltonLibraryAddition,
  Building.EdmondsonHall,
  Building.SpaldingHall,
  Building.WebsterHall,
  Building.QueenLiliuokalaniCenterforStudentServices,
  Building.SaundersHall,
  Building.CrawfordHall,
  Building.BusinessAdministrationBuilding,
  Building.GeorgeHall,
];
  const location: Building = validBuildings.includes(pin.location)
    ? pin.location
    : Building.Outside;

  await prisma.pin.create({
    data: {
      location,
      floor: pin.floor,
      description: pin.description,
    },
  });
  redirect('/list');
}

/**
 * Edits pin
 *  @param pin,
 */

export async function editContact(pin: Pin) {
  await prisma.pin.update({
    where: { id: pin.id },
    data: {
      location: pin.location,
      floor: pin.floor
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}