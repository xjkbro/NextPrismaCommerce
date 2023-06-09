"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductTable() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXTAUTH_URL}/api/rest/products?page=${pageIndex}`,
        fetcher
    );

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <>
            <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.products.map((product, i) => (
                    <article
                        key={i}
                        className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                    >
                        <Link href={`/products/${product.slug}`}>
                            <div className="relative flex items-end overflow-hidden rounded-xl">
                                <Image
                                    src={product.image}
                                    alt="Hotel Photo"
                                    className="object-contain h-48 w-96"
                                    width={500}
                                    height={500}
                                />
                                {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        <button className="text-sm">Add to cart</button>
                    </div> */}
                            </div>

                            <div className="mt-1 p-2">
                                <h2 className="text-slate-700">
                                    {product.title}
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    {product.short_description}
                                </p>

                                <div className="mt-3 flex items-end justify-between">
                                    <p className="text-lg font-bold text-blue-500">
                                        ${product.price}
                                    </p>

                                    <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            />
                                        </svg>

                                        <button className="text-sm">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
            <nav
                className="isolate flex -space-x-px rounded-md shadow-sm justify-center"
                aria-label="Pagination"
            >
                <button
                    onClick={() => setPageIndex(pageIndex - 1)}
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    {pageIndex + 1}
                </span>
                <button
                    onClick={() => setPageIndex(pageIndex + 1)}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </nav>
        </>
    );
}
