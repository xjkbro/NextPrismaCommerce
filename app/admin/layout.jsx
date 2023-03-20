import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (session) {
        return <>{children}</>;
    }
    return <p>Access Denied</p>;
}
