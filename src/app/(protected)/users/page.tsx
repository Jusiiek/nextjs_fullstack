import { PrismaClient } from '@prisma/client';
import { Table, Title, Box } from '@mantine/core';
import Link from 'next/link';

export const dynamic = "force-dynamic";

async function getUsers() {
    const prisma = new PrismaClient();
    return prisma.user.findMany({
        select: { id: true, email: true, isActive: true },
    });
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <Box className="w-full">
            <Title order={2} className="mb-8 text-center text-3xl font-bold">
                Users
            </Title>
            <Table
                highlightOnHover
                withColumnBorders
                striped
                className="rounded-xl overflow-hidden"
            >
                <thead>
                <tr>
                    <th
                        className="text-center text-lg font-bold py-3"
                        style={{ fontSize: "1.35rem" }}>
                        Email
                    </th>
                    <th
                        className="text-center text-lg font-bold py-3"
                        style={{ fontSize: "1.35rem" }}>
                        Active
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td
                            className="text-center text-base py-2 font-medium"
                            style={{ fontSize: "1.15rem" }}
                        >
                            <Link href={`/users/${user.id}`}>{user.email}</Link>
                        </td>
                        <td
                            className="text-center text-base py-2 font-medium"
                            style={{ fontSize: "1.10rem" }}
                        >
                            {user.isActive
                                ? <span style={{ color: 'green', fontWeight: 700 }}>Yes</span>
                                : <span style={{ color: 'red', fontWeight: 700 }}>No</span>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Box>
    );
}
