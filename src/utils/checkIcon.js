// Checks if the input is empty, and if it is not, returns the "active" class and href="input"

export function checkIcon(icon) {
    if (icon == "") {
      return `class="disable-icon"`;
    } else {
      return `class="active-icon" href="${icon}"`;
    }
}