import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const product = await prisma.product.findFirst({
                where: {
                    slug: req.query.slug,
                },
            });
            res.status(200).json({ product });

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
