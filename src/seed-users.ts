import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from './lib/prisma';

const users = [
  ['Kai', 'Nakamura', 'kai.nakamura@cycle5ense.com'],
  ['Leilani', 'Santos', 'leilani.santos@cycle5ense.com'],
  ['Malia', 'Kim', 'malia.kim@cycle5ense.com'],
  ['Koa', 'Tanaka', 'koa.tanaka@cycle5ense.com'],
  ['Noah', 'Reyes', 'noah.reyes@cycle5ense.com'],
  ['Emma', 'Lee', 'emma.lee@cycle5ense.com'],
  ['Liam', 'Wong', 'liam.wong@cycle5ense.com'],
  ['Olivia', 'Garcia', 'olivia.garcia@cycle5ense.com'],
  ['Mason', 'Nguyen', 'mason.nguyen@cycle5ense.com'],
  ['Ava', 'Park', 'ava.park@cycle5ense.com'],
  ['Ethan', 'Yamamoto', 'ethan.yamamoto@cycle5ense.com'],
  ['Sophia', 'Martinez', 'sophia.martinez@cycle5ense.com'],
  ['Logan', 'Chang', 'logan.chang@cycle5ense.com'],
  ['Mia', 'Anderson', 'mia.anderson@cycle5ense.com'],
  ['Lucas', 'Chen', 'lucas.chen@cycle5ense.com'],
  ['Isabella', 'Flores', 'isabella.flores@cycle5ense.com'],
  ['Jackson', 'Torres', 'jackson.torres@cycle5ense.com'],
  ['Amelia', 'Rivera', 'amelia.rivera@cycle5ense.com'],
  ['Aiden', 'Miller', 'aiden.miller@cycle5ense.com'],
  ['Harper', 'Wilson', 'harper.wilson@cycle5ense.com'],
  ['James', 'Brown', 'james.brown@cycle5ense.com'],
  ['Evelyn', 'Davis', 'evelyn.davis@cycle5ense.com'],
  ['Benjamin', 'Rodriguez', 'benjamin.rodriguez@cycle5ense.com'],
  ['Abigail', 'Lopez', 'abigail.lopez@cycle5ense.com'],
  ['Elijah', 'Hernandez', 'elijah.hernandez@cycle5ense.com'],
  ['Emily', 'Gonzalez', 'emily.gonzalez@cycle5ense.com'],
  ['Daniel', 'Perez', 'daniel.perez@cycle5ense.com'],
  ['Ella', 'Robinson', 'ella.robinson@cycle5ense.com'],
  ['Michael', 'Young', 'michael.young@cycle5ense.com'],
  ['Scarlett', 'Allen', 'scarlett.allen@cycle5ense.com'],
  ['Alexander', 'King', 'alexander.king@cycle5ense.com'],
  ['Grace', 'Wright', 'grace.wright@cycle5ense.com'],
  ['Henry', 'Scott', 'henry.scott@cycle5ense.com'],
  ['Chloe', 'Green', 'chloe.green@cycle5ense.com'],
  ['Sebastian', 'Adams', 'sebastian.adams@cycle5ense.com'],
  ['Victoria', 'Baker', 'victoria.baker@cycle5ense.com'],
  ['Jack', 'Nelson', 'jack.nelson@cycle5ense.com'],
  ['Riley', 'Carter', 'riley.carter@cycle5ense.com'],
  ['Owen', 'Mitchell', 'owen.mitchell@cycle5ense.com'],
  ['Aria', 'Perez', 'aria.perez@cycle5ense.com'],
  ['Samuel', 'Roberts', 'samuel.roberts@cycle5ense.com'],
  ['Luna', 'Turner', 'luna.turner@cycle5ense.com'],
  ['Matthew', 'Phillips', 'matthew.phillips@cycle5ense.com'],
  ['Zoey', 'Campbell', 'zoey.campbell@cycle5ense.com'],
  ['Joseph', 'Parker', 'joseph.parker@cycle5ense.com'],
  ['Penelope', 'Evans', 'penelope.evans@cycle5ense.com'],
  ['David', 'Edwards', 'david.edwards@cycle5ense.com'],
  ['Layla', 'Collins', 'layla.collins@cycle5ense.com'],
  ['Carter', 'Stewart', 'carter.stewart@cycle5ense.com'],
  ['Nora', 'Sanchez', 'nora.sanchez@cycle5ense.com'],
  ['Wyatt', 'Morris', 'wyatt.morris@cycle5ense.com'],
  ['Camila', 'Rogers', 'camila.rogers@cycle5ense.com'],
  ['John', 'Reed', 'john.reed@cycle5ense.com'],
  ['Aurora', 'Cook', 'aurora.cook@cycle5ense.com'],
  ['Luke', 'Morgan', 'luke.morgan@cycle5ense.com'],
  ['Hannah', 'Bell', 'hannah.bell@cycle5ense.com'],
  ['Jayden', 'Murphy', 'jayden.murphy@cycle5ense.com'],
  ['Addison', 'Bailey', 'addison.bailey@cycle5ense.com'],
  ['Dylan', 'Cooper', 'dylan.cooper@cycle5ense.com'],
  ['Stella', 'Richardson', 'stella.richardson@cycle5ense.com'],
  ['Grayson', 'Cox', 'grayson.cox@cycle5ense.com'],
  ['Natalie', 'Howard', 'natalie.howard@cycle5ense.com'],
  ['Levi', 'Ward', 'levi.ward@cycle5ense.com'],
  ['Zoe', 'Peterson', 'zoe.peterson@cycle5ense.com'],
  ['Isaac', 'Gray', 'isaac.gray@cycle5ense.com'],
  ['Hazel', 'Ramirez', 'hazel.ramirez@cycle5ense.com'],
  ['Gabriel', 'James', 'gabriel.james@cycle5ense.com'],
  ['Violet', 'Watson', 'violet.watson@cycle5ense.com'],
  ['Julian', 'Brooks', 'julian.brooks@cycle5ense.com'],
  ['Savannah', 'Kelly', 'savannah.kelly@cycle5ense.com'],
  ['Anthony', 'Sanders', 'anthony.sanders@cycle5ense.com'],
  ['Brooklyn', 'Price', 'brooklyn.price@cycle5ense.com'],
  ['Lincoln', 'Bennett', 'lincoln.bennett@cycle5ense.com'],
  ['Bella', 'Wood', 'bella.wood@cycle5ense.com'],
  ['Joshua', 'Barnes', 'joshua.barnes@cycle5ense.com'],
  ['Claire', 'Ross', 'claire.ross@cycle5ense.com'],
  ['Christopher', 'Henderson', 'christopher.henderson@cycle5ense.com'],
  ['Skylar', 'Coleman', 'skylar.coleman@cycle5ense.com'],
  ['Andrew', 'Jenkins', 'andrew.jenkins@cycle5ense.com'],
  ['Lucy', 'Perry', 'lucy.perry@cycle5ense.com'],
  ['Nathan', 'Powell', 'nathan.powell@cycle5ense.com'],
  ['Paisley', 'Long', 'paisley.long@cycle5ense.com'],
  ['Caleb', 'Patterson', 'caleb.patterson@cycle5ense.com'],
  ['Everly', 'Hughes', 'everly.hughes@cycle5ense.com'],
  ['Ryan', 'Flores', 'ryan.flores@cycle5ense.com'],
  ['Anna', 'Washington', 'anna.washington@cycle5ense.com'],
  ['Asher', 'Butler', 'asher.butler@cycle5ense.com'],
  ['Caroline', 'Simmons', 'caroline.simmons@cycle5ense.com'],
  ['Thomas', 'Foster', 'thomas.foster@cycle5ense.com'],
  ['Nova', 'Gonzales', 'nova.gonzales@cycle5ense.com'],
  ['Leo', 'Bryant', 'leo.bryant@cycle5ense.com'],
  ['Genesis', 'Alexander', 'genesis.alexander@cycle5ense.com'],
  ['Isaiah', 'Russell', 'isaiah.russell@cycle5ense.com'],
  ['Emilia', 'Griffin', 'emilia.griffin@cycle5ense.com'],
  ['Charles', 'Diaz', 'charles.diaz@cycle5ense.com'],
  ['Kennedy', 'Hayes', 'kennedy.hayes@cycle5ense.com'],
  ['Josiah', 'Myers', 'josiah.myers@cycle5ense.com'],
  ['Samantha', 'Ford', 'samantha.ford@cycle5ense.com'],
  ['Hunter', 'Hamilton', 'hunter.hamilton@cycle5ense.com'],
  ['Naomi', 'Graham', 'naomi.graham@cycle5ense.com'],
];

async function main() {
  const password = await hash('changeme', 10);

  for (const [firstName, lastName, email] of users) {
    const createdUser = await prisma.user.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        password,
        role: Role.USER,
      },
      create: {
        firstName,
        lastName,
        email,
        password,
        role: Role.USER,
      },
    });

    const existingEntries = await prisma.recyclingEntry.count({
      where: { userId: createdUser.id },
    });

    if (existingEntries === 0) {
      await prisma.recyclingEntry.createMany({
        data: [
          {
            amount: Math.floor(Math.random() * 30) + 1,
            userId: createdUser.id,
          },
          {
            amount: Math.floor(Math.random() * 30) + 1,
            userId: createdUser.id,
          },
        ],
      });
    }
  }

  console.log('Seeded 100 users.');
  console.log('Password for all seeded users: changeme');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

