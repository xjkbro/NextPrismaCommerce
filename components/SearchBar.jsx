"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function handleSearch(search) {
            const results = await fetch(
                `${process.env.NEXTAUTH_URL}/api/rest/search/${search}`
            );
            const { data } = await results.json();
            console.log(data);
            setSearchResults(data);
            // return data;
        }
        handleSearch(search);
    }, [search, setSearchResults]);

    useEffect(() => {});
    return (
        <>
            <form className="relative flex justify-center w-1/2">
                <input
                    className="w-3/5 px-1 py-2 rounded-l-md ring-1 ring-blue-500 focus:outline-none"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onFocus={onFocus}
                    onBlur={() => {
                        setTimeout(() => onBlur(), 300);
                    }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        console.log(searchResults);
                    }}
                />
                <button className="px-2 py-2 font-bold text-white transition-all bg-blue-500 hover:bg-blue-400 rounded-r-md ring-1 ring-blue-500">
                    Search
                </button>
                {/* <LiveFeed focused={focused} searchResults={searchResults}/> */}
                {/* <LiveFeed focused={focused} search={search} /> */}

                {focused && search.length > 0 ? (
                    <div className="absolute flex flex-col w-4/6 overflow-scroll text-gray-900 bg-gray-200 top-10 left-24 max-h-96">
                        {searchResults.map((product, i) => (
                            <Link
                                key={i}
                                className="flex items-center gap-2 p-2 hover:bg-gray-300"
                                href={`/products/${product.slug}`}
                            >
                                <Image
                                    src={product.image}
                                    className="object-cover w-24 h-24"
                                    width={100}
                                    height={100}
                                    alt="asd"
                                />
                                <div className="text-sm font-semibold">
                                    <div>{product.title}</div>
                                    <div className="w-5/6 text-xs font-normal">
                                        {product?.short_description?.substr(
                                            0,
                                            200
                                        )}
                                        ...
                                    </div>
                                </div>
                                <div>${product.price}</div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </form>
        </>
    );
}
