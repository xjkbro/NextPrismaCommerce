import Image from 'next/image';
import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Product({params}) {
    const {product} = await getProduct(params.slug)
    console.log(product)
  return (
    <div className='mt-12'>
        <div className='grid items-center w-2/3 grid-cols-2 mx-auto my-24'>
            <div className=''><Image src={product.image} className="h-48 w-fit" width={300} height={300} alt={product.title}/></div>
            <div className='prose'>
                <h1>{product.title}</h1>
                <p>{product.short_description}</p>
                <h2>${product.price}</h2>
            </div>
        </div>
        {/* <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
            {product.description}
        </ReactMarkdown> */}
        <div className='mx-auto prose'>
            <h1>Description</h1>
            <div dangerouslySetInnerHTML={{__html: product.description}} /> 
        </div>
        <div className='mx-auto prose'>
            <h1>Specifications</h1>
            <div dangerouslySetInnerHTML={{__html: product.specifications}} /> 
        </div>
    </div>
  )
}

const  getProduct = async(slug) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/rest/product/${slug}`)
    return res.json()
}