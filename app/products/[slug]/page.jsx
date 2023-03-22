import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Product({ params }) {
    const { product } = await getProduct(params.slug);
    console.log(product);
    return (
        <div className="mt-12 w-2/3 mx-auto relative">
            {/* <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
            {product.description}
        </ReactMarkdown> */}

            <div className="w-2/3 inline-block">
                <div className="grid items-center w-2/3 grid-cols-2 gap-12 my-12">
                    <div className="">
                        <Image
                            src={product.image}
                            className="h-64 w-fit"
                            width={400}
                            height={400}
                            alt={product.title}
                        />
                    </div>
                    <div className="prose">
                        <h1>{product.title}</h1>
                        <p>{product.short_description}</p>
                        <h2>${product.price}</h2>
                    </div>
                </div>
                <div className="mx-auto prose">
                    <h1>Description</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                </div>
                <div className="mx-auto prose">
                    <h1>Specifications</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: product.specifications,
                        }}
                    />
                </div>
            </div>
            <div className="w-1/4 prose outline outline-gray-300 shadow-md inline-block fixed m-8 p-4">
                <h1>{product.quantity} In Stock</h1>
                <hr />
                <div className="flex gap-2 flex-col">
                    <button className="p-2 bg-red-600 hover:bg-red-400 transition-all text-white">
                        Add to Cart
                    </button>
                    <button className="p-2 bg-red-600 hover:bg-red-400 transition-all text-white">
                        Add to Quote
                    </button>
                    <button className="p-2 bg-red-600 hover:bg-red-400 transition-all text-white">
                        Add to List
                    </button>
                </div>
            </div>
        </div>
    );
}

const getProduct = async (slug) => {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/rest/product/${slug}`
    );
    return res.json();
};