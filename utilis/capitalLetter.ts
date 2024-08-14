export function capitalizeFirstLetter(text: string) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}