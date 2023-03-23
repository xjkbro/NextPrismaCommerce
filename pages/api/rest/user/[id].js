import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            console.log(req.query)
            const user = await prisma.user.findFirst({
                where: {
                    id: req.query.id
                }
            });
            console.log(user)
            res.status(200).json({ user });

            break;
        case "POST":
            res.status(200).json({ msg: "POST" });
            break;
        case "PUT":
            const { id, firstname, lastname, company, email, role } = JSON.parse(req.body);
            console.log(req.body)
            const updated = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    company: company,
                    role: role
                }
            });
            return res
                .status(200)
                .setHeader("Cache-Control", "no-store")
                .send(JSON.stringify(updated));
            break;
        case "DELETE":
            res.status(200).json({ msg: "DELETE" });
            break;
    }
}
