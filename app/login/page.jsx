"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(e.target[0].value);
        const status = await signIn("credentials", {
            redirect: false,
            email: e.target[0].value,
            password: e.target[1].value,
            callbackUrl: "/admin",
        });
        console.log(status);
        if (status.ok) router.push(status.url);
    };
    return (
        <form onSubmit={handleSubmit}>
            hello
            <input type="text" name="email" />
            <input type="text" name="password" />
            <button type="submit" name="submit">
                Login
            </button>
        </form>
    );
}
