export function trim(s, c) {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
        "[" + c + "]+$", "g"
    ), "");
}

export function countOccurrence(string, char) {
    const split = string.toString().split(char);
    return split.length - 1;
}

function nextInt(min = 10, max = 35) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function nextId() {
    return `${nextInt().toString(36)}${nextInt().toString(36)}`;
}
