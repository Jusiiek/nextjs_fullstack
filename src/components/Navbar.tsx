'use client';
import { useState } from 'react';
import { Group, Box, Text, Button, Drawer } from '@mantine/core';
import { useSession, signOut } from 'next-auth/react';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';

const APP_NAME = 'APP_NAME';

export default function Navbar() {
    const { data: session, status } = useSession();
    const isMobile = useMediaQuery('(max-width: 640px)');
    const [drawerOpened, setDrawerOpened] = useState(false);

    if (status !== 'authenticated') return null;

    return (
        <>
            <Box
                component="nav"
                className="
          w-full h-16 px-4 flex items-center
          border-b border-neutral-900
          fixed top-0 left-0 z-20
          backdrop-blur-md
          bg-[#0a0a0a]/70
          shadow-lg
        "
        style={{
            background: 'rgba(10,10,10,0.66)',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.25)',
        }}
            >
                <Group justify="space-between" className="w-full">
                    <Group>
                        <Button
                            variant="subtle"
                            color="gray"
                            size="lg"
                            px={6}
                            radius="xl"
                            onClick={() => setDrawerOpened(true)}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                marginRight: '8px'
                            }}
                        >
                            <IconMenu2 size={28} />
                        </Button>
                        {isMobile ? (
                            <div className="w-full flex justify-center items-center">
                                <Text fw={700} size="xl" c="white">{APP_NAME}</Text>
                            </div>
                        ) : (
                            <Text fw={700} size="xl" c="white">{APP_NAME}</Text>
                        )}
                    </Group>
                    {!isMobile && (
                        <Group>
                            <Text size="md" c="gray.4">{session.user.email}</Text>
                            <Button
                                color="red"
                                size="xs"
                                variant="outline"
                                style={{
                                    borderColor: "#fff",
                                    color: "#fff",
                                    background: "rgba(42,42,42,0.4)",
                                    backdropFilter: "blur(8px)"
                                }}
                                onClick={() => signOut({ callbackUrl: '/auth' })}
                            >
                                Logout
                            </Button>
                        </Group>
                    )}
                </Group>
            </Box>
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                position="left"
                overlayProps={{ blur: 2, opacity: 0.7, color: '#1a1a1a' }}
                size={260}
                withCloseButton={false}
                padding="md"
                title={
                    <Group justify="space-between" className="w-full">
                        <Group>
                            <Button
                                variant="subtle"
                                color="gray"
                                size="lg"
                                px={6}
                                radius="xl"
                                onClick={() => setDrawerOpened(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    marginRight: '8px'
                                }}
                            >
                                <IconMenu2 size={28} />
                            </Button>
                        </Group>
                    </Group>
                }
                className={"drawer-c"}
                styles={{
                    content: { background: 'rgba(20,20,20,0.90)', backdropFilter: 'blur(18px)' },
                    header: {
                        background: 'rgba(255,255,255,0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        padding: '6px 16px',
                    },
                }}
            >
                <Box mt="md">
                    <Button
                        fullWidth
                        variant="light"
                        color="gray"
                        className="mb-2"
                        component="a"
                        href="/"
                    >
                        Home
                    </Button>
                    <Button
                        fullWidth
                        variant="light"
                        color="gray"
                        className="mb-2"
                        component="a"
                        href="/users"
                    >
                        Users
                    </Button>
                    <Button
                        fullWidth
                        color="red"
                        variant="outline"
                        mt="xl"
                        onClick={() => signOut({ callbackUrl: '/auth' })}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
