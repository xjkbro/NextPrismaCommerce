"use client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Protected() {
    const session = useSession()
    console.log(session)
    return (
        <div>
            <div>Protected</div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}
