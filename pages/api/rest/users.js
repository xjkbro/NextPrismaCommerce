import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    firstname: true,
                    lastname: true,
                },
                orderBy: {
                    username: "asc",
                },
            });
            res.status(200).json({ users });

            break;
        case "POST":
            res.status(200).json({ msg: "POST" });
            break;
        case "PUT":
            const user = await prisma.user.update({
                where: {
                    email: req.body.email,
                },
                data: {
                    role: req.body.role,
                },
            });
            res.status(200).json({ user });
            break;
        case "DELETE":
            res.status(200).json({ msg: "DELETE" });
            break;
    }
}
