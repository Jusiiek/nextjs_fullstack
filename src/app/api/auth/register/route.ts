import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/utils/password';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password)
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing)
            return NextResponse.json({ error: "User already exists" }, { status: 400 });

        const hash = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                hashPassword: hash,
                isActive: true
            }
        });

        return NextResponse.json({
            user: { id: user.id, email: user.email, isActive: user.isActive }
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
