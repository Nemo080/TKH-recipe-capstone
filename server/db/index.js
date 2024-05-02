const { PrismaClient } = require("@prisma/client");
//Instantiate a new prisma client instead of constantly creating new clients per route.
//The prisma client knows when to open and close connections to the db
const prisma = new PrismaClient();

module.exports = prisma;