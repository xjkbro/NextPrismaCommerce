// "use client";
import React from "react";

export default async function LiveFeed({ focused, search }) {
    const data = await getSearch(search);
    if (focused) {
        return (
            <div className="absolute bg-gray-700 opacity-30 min-h-96">
                {data?.map((p) => {
                    <>{p.title}</>;
                })}
            </div>
        );
    }
    return <></>;
}

const getSearch = async (search) => {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/rest/search/${search}`
    );
    const { data } = await res.json();
    return data;
};
