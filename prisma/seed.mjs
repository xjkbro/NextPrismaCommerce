import { randUser } from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
const prisma = new PrismaClient();

const main = async () => {
    try {
        await prisma.user.deleteMany();
        const fakeUsers = randUser({ length: 20 });
        await prisma.user.upsert({
            where: {
                email: "test@jkbro.dev",
            },
            create: {
                email: "test@jkbro.dev",
                firstname: "Jason",
                lastname: "De Lara",
                username: "jkbro",
                image: "https://avatars.githubusercontent.com/u/27465691?v=4",
                password: "123", //await hash(user.id, 12),
            },
            update: {},
        });
        for (let index = 0; index < fakeUsers.length; index++) {
            const user = fakeUsers[index];
            await prisma.user.upsert({
                where: {
                    email: user.email,
                },
                create: {
                    email: user.email,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    username: user.username,
                    image: user.img,
                    password: "13123123", //await hash(user.id, 12),
                },
                update: {},
            });
        }
    } catch (error) {
        throw error;
    }
};

main().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});
