
export default function image(preset, image) {
    if (!image) {
        return "";
    }

    return "/images/cache/" + preset + "/" + image.replace('#', '%23');
};
