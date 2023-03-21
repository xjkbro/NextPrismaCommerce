import React from "react";
import UserListItem from "./UserListItem";

export default async function Users() {
    const { users } = await getUsers();
    // console.log(users[0]);
    return (
        <div>
            <ul className="">
                <li className="grid grid-cols-5 py-2">
                    <strong>First Name</strong>
                    <strong>Last Name</strong>
                    <strong>Role</strong>
                    <strong>Username</strong>
                    <strong>Email</strong>
                </li>
                {users.map((user, i) => (
                    <UserListItem user={user} key={i} />
                ))}
            </ul>
        </div>
    );
}

const getUsers = async () => {
    const results = await fetch(`${process.env.NEXTAUTH_URL}/api/rest/users`, {
        cache: "no-store",
    });
    const users = await results.json();
    return users;
};
