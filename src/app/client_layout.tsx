"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <MantineProvider>
                <Notifications position="top-right" />
                {children}
            </MantineProvider>
        </SessionProvider>
    );
}
