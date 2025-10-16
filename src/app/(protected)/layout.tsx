import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/auth');
    return (
        <>
            <Navbar />
            <div className="mx-auto mt-[64px] max-w-3xl">
                {children}
            </div>
        </>
    );
}
