"use client";

import { useEffect, useState } from "react";

const roles = ["user", "admin", "author"];

export default function UserListItem({ user, key }) {
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
        <li className="grid grid-cols-5 py-2" key={key}>
            <div>{user.firstname}</div>
            <div>{user.lastname}</div>
            <select
                name="role"
                id="role"
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                {roles.map((role, i) => (
                    <option
                        key={i}
                        value={role}
                        // {...(selectedRole == role ? "selected" : "")}
                        selected={selectedRole == role}
                    >
                        {role}
                    </option>
                ))}
            </select>
            <div>{user.username}</div>
            <div>{user.email}</div>
        </li>
    );
}
