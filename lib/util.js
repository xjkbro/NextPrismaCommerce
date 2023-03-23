export const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
};

export const parseUrl = (str) => {
    const arr = str.split("/");
    return { path: arr[1], slug: arr[2] };
    // return {path};
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
