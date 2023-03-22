import React from "react";
import UserListItem from "./UserListItem";

export default async function Users() {
    const { users } = await getUsers();
    // console.log(users[0]);
    return (
        <div>
            <div className="flex justify-end mx-4 mt-2">
                <select name="sort" id="sort">
                    <option value="name-a-z">Name: A - Z</option>
                    <option value="name-z-a">Name: A - Z</option>
                    <option value="name-z-a">Email: A - Z</option>
                    <option value="name-z-a">Email: A - Z</option>
                    <option value="name-z-a">Role</option>
                    <option value="name-z-a">Newest</option>
                </select>
            </div>
            <ul className="m-4">
                <li className="grid grid-cols-5 gap-1 p-2 py-2 text-white bg-gray-600">
                    <strong>First Name</strong>
                    <strong>Last Name</strong>
                    <strong>Username</strong>
                    <strong>Email</strong>
                    <strong>Role</strong>
                </li>
                {users.map((user, index) => (
                    <UserListItem user={user} key={index} index={index} />
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
