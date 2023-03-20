"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "@/lib/query";

export default function AppWrapper({ children }) {
    return (
        <SessionProvider>
            {/* <QueryClientProvider client={queryClient}> */}
            {children}
            {/* </QueryClientProvider> */}
        </SessionProvider>
    );
}
