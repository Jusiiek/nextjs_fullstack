import React from "react";
import ClientLayout from "@/app/client_layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}
