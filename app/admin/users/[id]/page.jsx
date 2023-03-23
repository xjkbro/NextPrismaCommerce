"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { useFormik } from "formik";
import { createSlug } from "@/lib/util";
import { roles } from "@/lib/constants";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function User({ params }) {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXTAUTH_URL}/api/rest/user/${params.id}`,
        fetcher
    );
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: data?.user.firstname,
            lastname: data?.user.lastname,
            email: data?.user.email,
            company: data?.user.company,
            role: data?.user.role,
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/rest/user/${params.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    id: params.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    company: values.company,
                    email: values.email,
                    role: values.role,
                }),
            }
        );
        const data = await res.json();
        router.push(`/admin/users`);
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
                                        <div className="col-span-4">
                                            <label
                                                htmlFor="username"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Username
                                            </label>
                                            <div className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                                                {data.user.username}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <label
                                                htmlFor="role"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Role
                                            </label>
                                            <select
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                id="role"
                                                name="role"
                                                {...formik.getFieldProps(
                                                    "role"
                                                )}
                                            >
                                                {roles.map((role, i) => (
                                                    <option
                                                        key={i}
                                                        value={role}
                                                        // className={`${i == 0 ? "rounded-t-sm" : ""} ${i == roles.length-1 ? "rounded-b-sm" : ""}`}
                                                        selected={
                                                            formik.values
                                                                .role == role
                                                        }
                                                    >
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="first-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...formik.getFieldProps(
                                                    "firstname"
                                                )}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="last-name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...formik.getFieldProps(
                                                    "lastname"
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label
                                                htmlFor="company"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...formik.getFieldProps(
                                                    "company"
                                                )}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...formik.getFieldProps(
                                                    "email"
                                                )}
                                            />
                                        </div>

                                        {/* 

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="country"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Country
                                            </label>
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <label
                                                htmlFor="street-address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Street address
                                            </label>
                                            <input
                                                type="text"
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="region"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                State / Province
                                            </label>
                                            <input
                                                type="text"
                                                name="region"
                                                id="region"
                                                autoComplete="address-level1"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="postal-code"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                ZIP / Postal code
                                            </label>
                                            <input
                                                type="text"
                                                name="postal-code"
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div> 
                                        */}
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
                    </div>
                </div>
            </div>
        </div>

        // <div className="flex items-center justify-center w-full gap-0 p-2 md:gap-4 md:p-12 ">
        //     <div className="mx-auto max-w-[550px]">
        //         <Link
        //             href={`/store/product/${product.id}`}
        //             className="flex justify-end font-bold hover:underline"
        //         >
        //             Go To Product
        //         </Link>
        //         {savedData ? (
        //             <div
        //                 className="flex items-center justify-center w-full h-24 my-4 text-green-600 bg-green-100 border-4 border-green-300 rounded-lg"
        //                 onClick={() => setSavedData(false)}
        //             >
        //                 Data Saved
        //             </div>
        //         ) : (
        //             ""
        //         )}
        //         <form>
        //             <div className="flex flex-wrap -mx-3">
        //                 <div className="w-full px-3">
        //                     <div className="mb-5">
        //                         <label
        //                             for="title"
        //                             className="mb-3 block text-base font-medium text-[#07074D]"
        //                         >
        //                             Title
        //                         </label>
        //                         <input
        //                             type="text"
        //                             name="title"
        //                             id="title"
        //                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                             onChange={(e) => setTitle(e.target.value)}
        //                             value={title}
        //                             disabled={isPending}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="w-full px-3">
        //                     <div className="mb-5">
        //                         <label
        //                             for="slug"
        //                             className="mb-3 block text-base font-medium text-[#07074D]"
        //                         >
        //                             Slug
        //                         </label>
        //                         <div className="w-full">
        //                             <input
        //                                 type="text"
        //                                 name="slug"
        //                                 id="slug"
        //                                 className="w-11/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                                 onChange={(e) =>
        //                                     setSlug(e.target.value)
        //                                 }
        //                                 value={slug}
        //                                 disabled={isPending}
        //                             />
        //                             <button
        //                                 className="w-1/12"
        //                                 onClick={(e) => {
        //                                     e.preventDefault();
        //                                     setSlug(createSlug(title));
        //                                 }}
        //                             >
        //                                 <FontAwesomeIcon
        //                                     icon={faArrowsRotate}
        //                                 />
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="w-full px-3">
        //                     <div className="mb-5">
        //                         <label
        //                             for="image"
        //                             className="mb-3 block text-base font-medium text-[#07074D]"
        //                         >
        //                             Image Url
        //                         </label>
        //                         <input
        //                             type="text"
        //                             name="image"
        //                             id="image"
        //                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                             onChange={(e) => setImage(e.target.value)}
        //                             value={image}
        //                             disabled={isPending}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="w-full px-3">
        //                     <div className="mb-5">
        //                         <label
        //                             for="price"
        //                             className="mb-3 block text-base font-medium text-[#07074D]"
        //                         >
        //                             Price
        //                         </label>
        //                         <input
        //                             type="number"
        //                             step={0.01}
        //                             min={0}
        //                             name="price"
        //                             id="price"
        //                             className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                             onChange={(e) => setPrice(e.target.value)}
        //                             value={price}
        //                             disabled={isPending}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div className="w-full px-3">
        //                     <div className="flex items-center w-full gap-4 mb-5">
        //                         <input
        //                             type="checkbox"
        //                             name="available"
        //                             className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1]"
        //                             onChange={(e) =>
        //                                 setAvailable(e.target.checked)
        //                             }
        //                             checked={available}
        //                             disabled={isPending}
        //                         />
        //                         <label
        //                             for="available"
        //                             className="block font-medium text-[#07074D]"
        //                         >
        //                             Available
        //                         </label>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="mb-5">
        //                 <label
        //                     for="short_description"
        //                     className="mb-3 block text-base font-medium text-[#07074D]"
        //                 >
        //                     Short Description
        //                 </label>
        //                 <textarea
        //                     id="short_description"
        //                     name="short_description"
        //                     onChange={(e) =>
        //                         setShortDescription(e.target.value)
        //                     }
        //                     value={shortDescription}
        //                     disabled={isPending}
        //                     className="w-full h-24 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                 />
        //             </div>

        //             <div className="mb-5">
        //                 <label
        //                     for="description"
        //                     className="mb-3 block text-base font-medium text-[#07074D]"
        //                 >
        //                     Description
        //                 </label>
        //                 <textarea
        //                     id="description"
        //                     name="description"
        //                     onChange={(e) => setDescription(e.target.value)}
        //                     value={description}
        //                     disabled={isPending}
        //                     className="w-full h-48 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        //                 />
        //             </div>

        //             <div>
        //                 <input
        //                     className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:cursor-pointer"
        //                     type="submit"
        //                     value="Submit"
        //                     onClick={handleSubmit}
        //                 />
        //             </div>
        //         </form>
        //     </div>
        //     <div className="hidden md:block mx-auto max-w-[550px]  h-screen overflow-y-scroll border p-2 rounded-md border-rose-200">
        //         <ReactMarkdown className="prose " remarkPlugins={[remarkGfm]}>
        //             {description}
        //         </ReactMarkdown>
        //     </div>
        // </div>
    );
}
