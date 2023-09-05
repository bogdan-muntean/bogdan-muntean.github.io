// Checks if the input is empty, and if it is not, returns the "active" class and href="input"
export function checkLink(link) {
    if (link == "") {
      return `class="disable-title"`;
    } else {
      return `class="active-title" href="${link}"`;
    }
}