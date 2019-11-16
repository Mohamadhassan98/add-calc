/**
 * Trims the s param, trailed by c param. More formally, removes all `c`s from end of `s` so that `++c++` becomes `++c` after calling trim('++c++', '+');
 * @param s the string to trim
 * @param c the character to remove
 * @returns {void | string}
 */
export function trim(s, c) {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
        "[" + c + "]+$", "g"
    ), "");
}

/**
 * Counts occurrence of char in string.
 * @param string
 * @param char
 * @returns {number}
 */
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
