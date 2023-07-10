import { PrismaClient } from '@prisma/client';

let prismaIntance = null;

function getPrismaInstance () {
    if(!prismaIntance) {
        prismaIntance = new PrismaClient();
    }
    return prismaIntance;
}

export default getPrismaInstance;