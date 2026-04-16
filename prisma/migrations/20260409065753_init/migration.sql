-- CreateEnum
CREATE TYPE "Building" AS ENUM ('Outside', 'CampusCenter', 'ArtBuilding', 'HolmesHall', 'KraussHall', 'POST', 'MarineScienceBuilding', 'UniversityHealthServices', 'KennedyTheatre', 'KellerHall', 'WatanabeHall', 'HawaiiInstituteGeophysics', 'PhysicalScienceBuilding', 'InformationTechnologyCenter', 'BilgerHall', 'BilgerAddition', 'SakamakiHall', 'KuykendallHall', 'KuykendallAnnex', 'Building37', 'MillerHall', 'WarriorRecreationCenter', 'AdminServicesBuilding1', 'AdminServicesBuilding2', 'HemmenwayHall', 'BachmanHall', 'DeanHall', 'GartleyHall', 'FutureStudentSuccessCenter', 'ArchitectureBuilding', 'AndrewsOutdoorTheatre', 'HawaiiHall', 'LifeSciencesBuilding', 'MooreHall', 'ParadisePalms', 'HamiltonLibrary', 'HamiltonLibraryAddition', 'EdmondsonHall', 'SpaldingHall', 'WebsterHall', 'QueenLiliuokalaniCenterforStudentServices', 'SaundersHall', 'CrawfordHall', 'BusinessAdministrationBuilding', 'GeorgeHall');

-- CreateTable
CREATE TABLE "Pin" (
    "id" SERIAL NOT NULL,
    "location" "Building" NOT NULL DEFAULT 'Outside',
    "floor" INTEGER NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);
