import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({ log: ['query'] });

function createDateOfBirth(year: number, month: number, date: number) {
  const result = new Date();

  result.setFullYear(year);
  result.setMonth(month);
  result.setDate(date);

  return result;
}

async function main() {
  try {
    const majors = await Promise.all(
      [
        { fullName: 'Information System', shortName: 'IS' },
        { fullName: 'Digital Business', shortName: 'DB' },
      ].map(function (m) {
        return client.major.create({ data: m });
      })
    );

    console.log(majors);

    const students = await Promise.all(
      [
        {
          majorId: majors[0].id,
          uniqueId: '210030019',
          firstName: 'John',
          lastName: 'Doe',
          placeOfBirth: 'Denpasar',
          dateOfBirth: createDateOfBirth(2003, 7, 30),
        },
      ].map(async function (s) {
        return await client.student.create({ data: s });
      })
    );
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(() => client.$disconnect())
  .catch((error) => {
    if (error) console.error(error);
    client.$disconnect();
    process.exit(1);
  });
