import fetch from 'isomorphic-fetch';

let data = {
    list: {},
    gallery: {}
};

function download(key, path) {
    if (!path) {
        path = "";
    }

    if (data[key].hasOwnProperty(path)) {
        return Promise.resolve(data[key][path]);
    }

    let url = `${window.baseURL}/api/${key}/${path}`;

    return fetch(url, {credentials: 'same-origin'})
        .then(res => res.json())
        .then(
            json => {
                data[key][path] = json;
                return json;
            })
        .catch(
            error => {
                console.log("failed miserably", error)
            })
}

export function fetchGallery(path) {
    return download('gallery', path);
}

export function fetchList(path) {
    return download('list', path);
}
