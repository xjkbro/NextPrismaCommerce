"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    faUser,
    faChartBar,
    faPen,
    faFolderOpen,
    faCartShopping,
    faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const sidebarLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: faChartBar },
    { name: "Users", path: "/admin/users", icon: faUser },
    { name: "Posts", path: "/admin/posts", icon: faPen },
    { name: "Categories", path: "/admin/categories", icon: faFolderOpen },
    { name: "Products", path: "/admin/products", icon: faBagShopping },
    { name: "Orders", path: "/admin/orders", icon: faCartShopping },
];
export const secondarySidebarLinks = [
    { name: "Sign Out", path: signOut, icon: faChartBar },
    { name: "Users", path: "/admin/users", icon: faUser },
    { name: "Posts", path: "/admin/posts", icon: faPen },
    { name: "Categories", path: "/admin/categories", icon: faFolderOpen },
    { name: "Products", path: "/admin/products", icon: faBagShopping },
    { name: "Orders", path: "/admin/orders", icon: faCartShopping },
];

export default function AdminSidebar() {
    return (
        <aside
            id="sidebar"
            className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 duration-75 lg:flex transition-width"
            aria-label="Sidebar"
        >
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y">
                        <ul className="pb-2 space-y-2">
                            <li>
                                <form
                                    action="#"
                                    method="GET"
                                    className="lg:hidden"
                                >
                                    <label
                                        htmlFor="mobile-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-5 h-5 text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="email"
                                            id="mobile-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                            </li>
                            {sidebarLinks.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={item.path}
                                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        />
                                        <span className="ml-3">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-2 space-y-2">
                            {secondarySidebarLinks.map((item, i) => {
                                if (typeof item.path == "function") {
                                    return (
                                        <button
                                            key={i}
                                            onClick={item.path}
                                            className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                                        >
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                            />
                                            <span className="ml-4">
                                                {item.name}
                                            </span>
                                        </button>
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={i}
                                            href={item.path}
                                            className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                                        >
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                            />
                                            <span className="ml-4">
                                                {item.name}
                                            </span>
                                        </Link>
                                    );
                                }
                            })}
                            <Link
                                href="#"
                                target="_blank"
                                className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Documentation</span>
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                                <span className="ml-3">Components</span>
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                className="flex items-center p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="ml-3">Help</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
