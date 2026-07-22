// Checks if the input is empty, and if it is not, returns the "active" class and href="input"
export function checkLink(link) {
    const normalizedLink = typeof link === "string" ? link.trim() : "";

    if (normalizedLink === "") {
      return `class="disable-title"`;
    } else {
      return `class="active-title" href="${normalizedLink}"`;
    }
}
