import { PrismaClient } from '@prisma/client';
import { Card, Title, Text, Box } from '@mantine/core';


interface UserDetailsProps {
    params: { userId: string }
}

export default async function UserDetailPage({ params }: UserDetailsProps) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: { id: params.userId },
        select: { id: true, email: true, isActive: true }
    });

    if (!user) {
        return <Box className="max-w-md mx-auto mt-8"><Text color="orange">User not found</Text></Box>;
    }

    return (
        <Box className="max-w-md mx-auto mt-8">
            <Card shadow="sm" padding="lg">
                <Title order={3} className="mb-2">User Details</Title>
                <Text><b>ID:</b> {user.id}</Text>
                <Text><b>Email:</b> {user.email}</Text>
                <Text>
                    <b>Active:</b>{' '}
                    {user.isActive
                        ? <span style={{ color: 'green', fontWeight: 700 }}>Yes</span>
                        : <span style={{ color: 'red', fontWeight: 700 }}>No</span>
                    }
                </Text>
            </Card>
        </Box>
    );
}
