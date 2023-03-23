import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductTable from './ProductTable';

export default async function Products() {
    // const { products } = await getProducts();
    // console.log(users[0]);
    return (
        <div>
            {/* <div className="flex justify-end mx-4 mt-2">
                <select name="sort" id="sort">
                    <option value="name-a-z">Name: A - Z</option>
                    <option value="name-z-a">Name: A - Z</option>
                    <option value="name-z-a">Email: A - Z</option>
                    <option value="name-z-a">Email: A - Z</option>
                    <option value="name-z-a">Role</option>
                    <option value="name-z-a">Newest</option>
                </select>
            </div> */}
            <ul className="m-4">
                <li className="grid grid-cols-5 gap-1 p-2 py-2 text-white bg-gray-600">
                    {/* <strong>Title</strong> */}
                    <strong className="col-span-3">Title</strong>
                    <strong>Slug</strong>
                    <strong className="w-8" >Price</strong>
                </li>
                <ProductTable/>
            </ul>
        </div>
    );
}

// const getProducts = async () => {
//     const results = await fetch(`${process.env.NEXTAUTH_URL}/api/rest/products`, {
//         cache: "no-store",
//     });
//     const users = await results.json();
//     return users;
// };
