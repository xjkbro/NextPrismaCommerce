"use client"
import React, { useState } from 'react'
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductTable() {
    const [pageIndex, setPageIndex] = useState(0);
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXTAUTH_URL}/api/rest/products?page=${pageIndex}`,
        fetcher
      );
      if (error) return "An error has occurred.";
      if (isLoading) return "Loading...";
      console.log(data.products)
      return <div>
            {data.products.map(item => <div key={item.id}>{item.title}</div>)}
            <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
        }
    