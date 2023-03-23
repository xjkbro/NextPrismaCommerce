"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";

export default function Header({ session }) {
    const currentPage = usePathname();

    if (
        currentPage.includes("/admin") ||
        currentPage.includes("/login") ||
        currentPage.includes("/register")
    )
        return <></>;
    return (
        <>
            {session?.user?.role == "admin" ? (
                <div className="flex justify-between w-full p-1 text-white bg-neutral-900 h-fit">
                    {/* <Link href="/admin/">Admin Dashboard</Link> */}
                    <Link href="/admin">Admin Dashboard</Link>
                </div>
            ) : (
                <></>
            )}
            <nav className="sticky top-0 z-10 flex items-center justify-center w-full h-16 gap-32 mx-auto bg-gray-100 shadow-md">
                <div>
                    <Link href="/">
                        <Image
                            src="/logo-1200x500.png"
                            width={240}
                            height={100}
                            className="w-40 object-contain"
                            alt="logo"
                        />
                    </Link>
                </div>
                <SearchBar />
                <div className="flex gap-4">
                    <button className="p-2 font-bold text-blue-500 bg-white outline outline-blue-500">
                        Cart
                    </button>
                    {status == "authenticated" ? (
                        <button
                            className="p-2 font-bold text-white bg-blue-500 outline outline-blue-500"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            className="p-2 font-bold text-white bg-blue-500 outline outline-blue-500"
                            onClick={signIn}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
            <header className="flex justify-between shadow-md">
                <div className="flex items-center justify-start w-full mx-auto bg-blue-300">
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="relative flex items-center h-12 px-4 font-semibold text-white transition-all group hover:bg-blue-400 w-fit"
                        href="/products"
                    >
                        Products
                        <div className="absolute left-0 hidden w-48 px-6 py-8 bg-white shadow group-hover:block top-12">
                            <div className="py-1">
                                <span className="block text-base font-bold text-purple-500 uppercase cursor-pointer hover:text-purple-700">
                                    Item
                                </span>
                            </div>
                            <div className="py-1">
                                <span className="block text-base font-bold text-purple-500 uppercase cursor-pointer hover:text-purple-700">
                                    Item 2
                                </span>
                            </div>
                            <div className="py-1">
                                <span className="block text-base font-bold text-purple-500 uppercase cursor-pointer hover:text-purple-700">
                                    Item 3
                                </span>
                            </div>
                            <div className="py-1">
                                <span className="block text-base font-bold text-purple-500 uppercase cursor-pointer hover:text-purple-700">
                                    Item 4
                                </span>
                            </div>
                            <div className="py-1">
                                <span className="block text-base font-bold text-purple-500 uppercase cursor-pointer hover:text-purple-700">
                                    Item 5
                                </span>
                            </div>
                        </div>
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/software"
                    >
                        Software
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/solutions"
                    >
                        Solutions
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/find"
                    >
                        Find
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/support"
                    >
                        Support
                    </Link>
                </div>
                <div className="flex items-center justify-end w-full mx-auto bg-blue-300">
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/software"
                    >
                        Software
                    </Link>
                    <Link
                        className="flex items-center h-12 px-4 font-semibold text-white transition-all hover:bg-blue-400 w-fit"
                        href="/solutions"
                    >
                        Solutions
                    </Link>
                </div>
            </header>
        </>
    );
}
