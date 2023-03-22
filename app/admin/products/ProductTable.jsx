"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

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
        <div>

            {data.products.map((product, index) => (
                <li key={index} className="grid grid-cols-4 gap-1 p-2 py-2">
                    <strong>
                        <Image src={product.image} width={25} height={25} className="inline object-contain w-8 h-8 rounded-full" alt={product.title} />
                        {product.title}
                    </strong>
                    <strong >{product.slug}</strong>
                    <strong className="w-8" >{product.price}</strong>
                    <Link className="w-8" href={`/products/${product.slug}`}>Link</Link>
                </li>
            ))}
            <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    );
}
