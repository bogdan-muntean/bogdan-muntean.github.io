export function checkIcon(icon) {
    if (icon == "") {
      return `class="disable-icon"`;
    } else {
      return `class="active-icon" href="${icon}"`;
    }
}