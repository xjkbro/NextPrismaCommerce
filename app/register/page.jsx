"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [show, setShow] = useState({ password: false, cpassword: false });
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        onSubmit,
    });
    async function onSubmit(values) {
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(values)
        }
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signup`, options)
        const status = await res.json();
        if (status) router.push("/login");
    }
    return (
        <>
            <h1>Anywhere in your app!</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    {...formik.getFieldProps("username")}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                />
                <input
                    type={`${show.password ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                />
                <input
                    type={`${show.cpassword ? "text" : "password"}`}
                    name="cpassword"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("cpassword")}
                />
                <button type="submit" name="submit">
                    Login
                </button>
            </form>
        </>
    );
}
