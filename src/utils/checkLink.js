export function checkLink(link) {
  console.log(link)
    if (link == "") {
      return `class="disable-title"`;
    } else {
      return `class="active-title" href="${link}"`;
    }
}