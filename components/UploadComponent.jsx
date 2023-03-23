"use client";
import { useEffect, useState } from "react";
import { storage } from "@/lib/firebase";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    listAll,
} from "firebase/storage";
import Image from "next/image";

export default function UploadComponent({ slug }) {
    const [imgUrl, setImgUrl] = useState(null);
    const [data, setData] = useState([]);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];

        if (!file) return;

        const storageRef = ref(storage, `files/products/${slug}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );

        // Find all the prefixes and items.
    };

    useEffect(() => {
        const listRef = ref(storage, `files/products/${slug}`);
        async function getImages() {
            const arr = [];
            const res = await listAll(listRef);
            await res.items.map(async (itemRef, i) => {
                arr.push(
                    new Promise((resolve, reject) => {
                        resolve(getDownloadURL(itemRef));
                        reject("error");
                    })
                );
            });
            console.log(await Promise.all(arr));
            setData(await Promise.all(arr));
        }
        getImages();
    }, [slug]);

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <input type="file" />
                <button type="submit">Upload</button>
            </form>
            {!imgUrl && (
                <div className="outerbar">
                    <div
                        className="innerbar"
                        style={{ width: `${progresspercent}%` }}
                    >
                        {progresspercent}%
                    </div>
                </div>
            )}
            <br />

            <div className="flex gap-2 w-full">
                {imgUrl && (
                    <Image
                        src={imgUrl}
                        alt="uploaded file"
                        width={200}
                        height={200}
                    />
                )}
                {data?.map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        width={200}
                        height={200}
                        alt="test"
                        className="w-48"
                    />
                ))}
            </div>
        </div>
    );
}
