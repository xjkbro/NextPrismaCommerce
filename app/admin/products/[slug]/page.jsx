"use client";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useFormik } from "formik";
import { storage } from "@/lib/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { createSlug } from "@/lib/util";
import { roles } from "@/lib/constants";
import UploadComponent from "@/components/UploadComponent";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Product({ params }) {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXTAUTH_URL}/api/rest/product/${params.slug}`,
        fetcher
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: data?.product?.title ? data?.product?.title : "",
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/rest/products/${params.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    id: params.id,
                    firstname: values.firstname,
                }),
            }
        );
        const data = await res.json();
        router.push(`/admin/products`);
    }
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <div className="m-4">
            <div className="mx-auto mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form
                            action="#"
                            method="POST"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        {/* <div className="col-span-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Username
                                    </label>
                                    <div className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                                        {data.user.username}
                                    </div>
                                </div> */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...formik.getFieldProps(
                                                    "title"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <UploadComponent slug={data.product.slug} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
