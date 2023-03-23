"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const roles = ["user", "admin", "author"];

export default function UserListItem({ user, index }) {
    const [selectedRole, setSelectedRole] = useState(user.role);

    useEffect(() => {
        async function updateRole() {
            const res = await fetch(
                `${process.env.NEXTAUTH_URL}/api/rest/users`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        role: selectedRole,
                    }),
                }
            );
            const data = await res.json();
            return data;
        }
        // console.log(updateRole());
    }, [selectedRole, user.email]);

    return (
        <li className={`grid grid-cols-4 gap-1 p-2 py-2 items-center ${parseInt(index)%2 > 0 ? "bg-gray-100" : ""}`} key={index}>
            <Link href={`/admin/users/${user.id}`}>
                <FontAwesomeIcon className="w-4 h-4 pr-2" icon={faArrowUpRightFromSquare} /> 
                {user.firstname}{" "}{user.lastname}
            </Link>
            <div className="">{user.username}</div>
            <div className="">{user.email}</div>
            <select
                className=""
                id="role"
                name="role"
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                {roles.map((role, i) => (
                    <option
                        key={i}
                        value={role}
                        selected={selectedRole == role}
                    >
                        {role}
                    </option>
                ))}
            </select>
        </li>
    );
}
