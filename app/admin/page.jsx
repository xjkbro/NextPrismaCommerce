"use client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Protected() {
<<<<<<< HEAD
    const session = useSession()
    console.log(session)
=======
    const { session, status } = useSession();
    console.log(session, status);
>>>>>>> a25b9b80b77aa8afc244922298f4f2ce07fe52e2
    return (
        <div>
            <div>Protected</div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}
