import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            console.log(req.query);
            const data = await prisma.product.findMany({
                where: {
                    title: {
                        contains: req.query.search,
                        mode: "insensitive",
                    },
                },
                select: {
                    title: true,
                    slug: true,
                    short_description: true,
                    price: true,
                    image: true,
                },
                take: 25
            });
            res.status(200).json({ data });

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
