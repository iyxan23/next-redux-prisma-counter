const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  await Promise.all([
    prisma.counter.create({ data: { counterId: "a", amount: 0 } }),
    prisma.counter.create({ data: { counterId: "b", amount: 10 } }),
  ]);
}

seed()
  .finally(() => prisma.$disconnect())
  .then(() => {
    console.log("Seeded successfully");
  });
