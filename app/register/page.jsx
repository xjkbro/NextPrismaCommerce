"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/signup`,
            options
        );
        const status = await res.json();
        if (status) router.push("/login");
    }
    return (
        <>
            <div className="flex flex-wrap content-center justify-center w-full min-h-screen py-10 bg-gray-200">
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md w-[24rem] h-[32rem]">
                        <Image
                            className="w-full h-full object-cover object-[25%] bg-no-repeat bg-cover rounded-l-md"
                            width={1200}
                            height={800}
                            alt="cat"
                            src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                        />
                    </div>
                    <div className="flex flex-wrap content-center justify-center rounded-r-md bg-white w-[24rem] h-[32rem]">
                        <div className="w-72">
                            <h1 className="text-xl font-semibold">
                                Welcome to NextPrismaCommerce!
                            </h1>
                            <small className="text-gray-400">
                                Fill out the details below to register with us!
                            </small>

                            <form
                                className="mt-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a Username"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("username")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("email")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Password
                                    </label>
                                    <input
                                        type={`${
                                            show.password ? "text" : "password"
                                        }`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("password")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block mb-2 text-xs font-semibold">
                                        Confirm Password
                                    </label>
                                    <input
                                        type={`${
                                            show.cpassword ? "text" : "password"
                                        }`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("cpassword")}
                                    />
                                </div>

                                <div className="mb-3">
                                    <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs font-semibold text-gray-400">
                                    Already have an account?
                                </span>
                                <Link
                                    href="/login"
                                    className="text-xs font-semibold text-purple-700"
                                >
                                    {" "}
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
