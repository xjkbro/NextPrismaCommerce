import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const handler = async (req, res) => {
    if (req.method === "POST") {
        if (!req.body)
            return res.status(404).json({ error: "Don't have form data." });
        const { username, email, password } = req.body;
        const duplicateEmailCheck = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        const duplicateUsernameCheck = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (duplicateEmailCheck)
            return res
                .status(422)
                .json({ message: "User with email already exists" });
        if (duplicateUsernameCheck)
            return res
                .status(422)
                .json({ message: "User with username already exists" });

        const hashPassword = await hash(password, 12);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });

        return res.status(201).json(user);
    }
    return res
        .status(500)
        .json({ message: "HTTP Method not valid. POST Accepted" });
};

export default handler;
