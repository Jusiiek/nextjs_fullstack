import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';

const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            email: 'active1@example.com',
            password: 'pass123',
            isActive: true,
        },
        {
            email: 'active2@example.com',
            password: 'pass456',
            isActive: true,
        },
        {
            email: 'inactive@example.com',
            password: 'pass789',
            isActive: false,
        },
    ];

    for (const u of users) {
        const hash = await hashPassword(u.password);
        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                email: u.email,
                hashPassword: hash,
                isActive: u.isActive,
            },
        });
    }
    console.log("Inserted users created!");
    await prisma.$disconnect();
}

main();
