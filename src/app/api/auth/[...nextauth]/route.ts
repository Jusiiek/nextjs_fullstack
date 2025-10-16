import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '@/utils/password';

const prisma = new PrismaClient();

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('NEXTAUTH_SECRET loaded:', process.env.NEXTAUTH_SECRET);
                if (!credentials?.email || !credentials.password) throw new Error("No credentials");
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !user.isActive) throw new Error("User not found or inactive");
                if (!(await verifyPassword(credentials.password, user.hashPassword))) throw new Error("Invalid password");
                return { id: user.id, email: user.email, isActive: user.isActive };
            }
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.isActive = user.isActive;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.isActive = token.isActive;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
