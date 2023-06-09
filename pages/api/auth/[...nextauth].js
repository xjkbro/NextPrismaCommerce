import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "test@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                // const email = "test@gmail.com";
                // const password = "123";
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    throw new Error("No user found with email");
                }
                // compare password
                const checkPassword = await compare(password, user.password);
                if (!checkPassword || user.email !== email) {
                    throw new Error("Incorrect credentials");
                }
                console.log(user);
                return user;
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            // console.log(url, baseUrl);
            return baseUrl;
        },
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            if (typeof user !== typeof undefined) token.user = user;

            return token;
        },
        session: async ({ session, user, token }) => {
            token?.user && (session.user = token.user);
            return session;
        },
        // async signIn({ user, account, profile, email, credentials }) {
        //     // console.log({ user, account, profile, email, credentials });
        //     console.log(user);
        //     // const isAllowedToSignIn = true;
        //     // if (isAllowedToSignIn) {
        //     //     return true;
        //     // } else {
        //     //     // Return false to display a default error message
        //     //     return false;
        //     //     // Or you can return a URL to redirect to:
        //     //     // return '/unauthorized'
        //     // }
        //     if (user?.role == "admin")
        //         return `${process.env.NEXTAUTH_URL}/admin`;
        //     else {
        //         if (user) return true;
        //         else return false;
        //     }
        // },
    },

    pages: {
        signIn: "/login",
    },
};
export default NextAuth(authOptions);
