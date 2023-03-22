import { randUser } from "@ngneat/falso";
import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
const prisma = new PrismaClient();
// const products = require('./productdata/products.json');
// import products from `./productdata/products.json` assert { type: `json` };
// const update = require('./productdata/update.json');

import { readFile } from 'fs/promises';
const products = JSON.parse(
    await readFile(
        new URL('./productdata/products.json', import.meta.url)
    )
);
// console.log(products.data[0])

// const main = async () => {
//     try {
//         await prisma.user.deleteMany();
//         const fakeUsers = randUser({ length: 20 });
//         await prisma.user.upsert({
//             where: {
//                 email: "test@jkbro.dev",
//             },
//             create: {
//                 email: "test@jkbro.dev",
//                 firstname: "Jason",
//                 lastname: "De Lara",
//                 username: "jkbro",
//                 image: "https://avatars.githubusercontent.com/u/27465691?v=4",
//                 password: "123", //await hash(user.id, 12),
//             },
//             update: {},
//         });
//         for (let index = 0; index < fakeUsers.length; index++) {
//             const user = fakeUsers[index];
//             await prisma.user.upsert({
//                 where: {
//                     email: user.email,
//                 },
//                 create: {
//                     email: user.email,
//                     firstname: user.firstName,
//                     lastname: user.lastName,
//                     username: user.username,
//                     image: user.img,
//                     password: "13123123", //await hash(user.id, 12),
//                 },
//                 update: {},
//             });
//         }

//         fetch("./productdata/products.json")
//         .then(response => {
//         return response.json();
//         })
//         .then(async (data) => {
//             for (let index = 0; index < data.data.length; index++) {
//                 const product = data.data[index];
//                 await prisma.product.upsert({
//                     where: {
//                         title: product.title
//                     },
//                     create: {
//                         title: product.title,
//                         slug: product.slug,
//                         description: product.description,
//                         short_description: product.short_description,
//                         specifications: product.specifications,
//                         quantity: parseInt(product.quantity),
//                         image: product.image,
//                     },
//                     update: {},
//                 });
//             }

//         });





//     } catch (error) {
//         throw error;
//     }
// };

// main().catch((err) => {
//     console.warn("Error While generating Seed: \n", err);
// });


const prices = JSON.parse(
    await readFile(
        new URL('./productdata/update.json', import.meta.url)
    )
);

const main = async () => {
    await prisma.product.deleteMany();
    Promise.all(
        products.data.map(async product => {
            const response = await prisma.product.upsert({
                where: {
                    title: product.title,
                },
                create: {
                    title: product.title,
                    slug: product.slug,
                    description: product.description,
                    short_description: product.short_description,
                    specifications: product.specifications,
                    quantity: parseInt(product.quantity),
                    image: (product?.image?.length > 0) ? (product.image) : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
                    price: 0.0
                },
                update:{}
            });
            return response;
        })
    );
    Promise.all(
        prices.data.map(async product => {
            const response = await prisma.product.update({
                where: {
                    title: product.title,
                },
                data:{
                    // title: product.title,
                    price: parseFloat(product.price)
                }
            });
            return response;
        })
    )
}
main().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});
