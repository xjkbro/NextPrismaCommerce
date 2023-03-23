import "@/styles/globals.css";

import AppWrapper from "@/components/AppWrapper";
import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "NextPrismaCommerce",
    description: "A New way to start a business.",
};

export default async function RootLayout({ children, params }) {
    const session = await getSession(headers().get("cookie") ?? "");
    return (
        <html lang="en">
            <body>
                <AppWrapper session={session}>
                    <Header session={session} />
                    {children}
                    <Footer />
                </AppWrapper>
            </body>
        </html>
    );
}
async function getSession(cookie) {
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/auth/session`,
        {
            headers: {
                cookie,
            },
        }
    );
    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}
