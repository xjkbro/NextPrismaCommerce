import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

const handler = async (req, res) => {
    console.log(req.method);
    if (req.method === "GET") {
        return res.status(200).json({ message: "Don't have form data." });
    }
    if (req.method === "POST") {
        // return res.status(200).json({ message: "1023" });

        if (!req.body)
            return res.status(404).json({ error: "Don't have form data." });

        const { email, password } = req.body;
        const res = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!res) {
            throw new Error("No user found with email");
        }
        // compare password
        const checkPassword = await compare(password, res.password);
        if (!checkPassword || res.email !== email) {
            throw new Error("Incorrect credentials");
        }

        return res.status(200).json(user);
    } else {
        return res
            .status(500)
            .json({ message: "HTTP Method not valid. POST Accepted" });
    }
};

export default handler;
