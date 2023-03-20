import Link from "next/link";

export default function Home() {
    return (
        <>
            Home
            <Link href="/login">Login</Link>
            {/* <Link>Sign Up</Link>
            <Link>Sign Out</Link> */}
        </>
    );
}
