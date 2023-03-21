"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // console.log(e.target[0].value);
    //     const status = await signIn("credentials", {
    //         redirect: false,
    //         email: e.target[0].value,
    //         password: e.target[1].value,
    //         callbackUrl: "/admin",
    //     });
    //     console.log(status);
    //     if (status.ok) router.push(status.url);
    // };
    const [show, setShow] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });
    async function onSubmit(values) {
        const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/",
        });
        console.log(status)
        if (status.ok) router.push(status.url);
    }
    return (
        <>
            <h1>Anywhere in your app!</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                />
                <input
                    type={`${show ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                />
                <button type="submit" name="submit">
                    Login
                </button>
            </form>
        </>
    );
}
