import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const myCursor = req.query.page ? req.query.page : "0" ;
            const products = await prisma.product.findMany({
                select: {
                    title: true,
                    image: true,
                    slug: true,
                    price: true,
                },
                orderBy: {
                    title: "asc",
                },
                take: 25,
                skip: parseInt(myCursor),
            });
            res.status(200).json({ products });

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
