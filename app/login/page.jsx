"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    const router = useRouter();

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
            callbackUrl: "/admin",
        });
        console.log(status);
        if (status.ok) router.push(status.url);
    }
    return (
        <>
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
                {/*  */}
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-[24rem] h-[32rem]">
                        <div className="w-72">
                            <h1 className="text-xl font-semibold">
                                Welcome back
                            </h1>
                            <small className="text-gray-400">
                                Welcome back! Please enter your details
                            </small>

                            <form
                                className="mt-4"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold">
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
                                    <label className="mb-2 block text-xs font-semibold">
                                        Password
                                    </label>
                                    <input
                                        type={`${show ? "text" : "password"}`}
                                        placeholder="********"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        {...formik.getFieldProps("password")}
                                    />
                                </div>

                                <div className="mb-3 flex flex-wrap content-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="mr-1 checked:bg-purple-700"
                                    />{" "}
                                    <label
                                        for="remember"
                                        className="mr-auto text-xs font-semibold"
                                    >
                                        Remember for 30 days
                                    </label>
                                    <Link
                                        href="#"
                                        className="text-xs font-semibold text-purple-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="mb-3">
                                    <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                    {/* <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                                        <Image
                                            className="w-5 mr-2"
                                            width={800}
                                            height={800}
                                            alt="cat"
                                            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                                        />
                                        Sign in with Google
                                    </button> */}
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-semibold">
                                    Don&apos;t have account?
                                </span>
                                <Link
                                    href="/register"
                                    className="text-xs font-semibold text-purple-700"
                                >
                                    {" "}
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md w-[24rem] h-[32rem]">
                        <Image
                            className="w-full h-full object-cover object-[25%] bg-no-repeat bg-cover rounded-r-md"
                            width={1200}
                            height={800}
                            alt="cat"
                            src="https://images.unsplash.com/photo-1659460542526-35b3257e1152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80"
                            // src="https://i.imgur.com/9l1A4OS.jpeg"
                        />
                    </div>
                </div>

                {/* <div className="mt-3 w-full">
                    <p className="text-center">
                        Made by{" "}
                        <a
                            target="_blank"
                            href="https://www.instagram.com/_inubayuaji/"
                            className="text-purple-700"
                        >
                            Inu Bayu Aji
                        </a>{" "}
                        and ispired by{" "}
                        <a
                            target="_blank"
                            href="https://dribbble.com/shots/17564792-Log-in-page-Untitled-UI"
                            className="text-purple-700"
                        >
                            this
                        </a>
                        .
                    </p>
                </div> */}
            </div>
        </>
    );
}
