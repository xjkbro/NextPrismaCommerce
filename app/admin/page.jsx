export default async function Admin() {
    const { users } = await getUsers();
    // console.log(users[0]);
    return (
        <div>
            <div>
                {users.map((user, i) => (
                    <div key={i}>{user.username}</div>
                ))}
            </div>
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
