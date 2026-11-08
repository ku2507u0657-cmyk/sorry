export function smart(text: string) {
  return text
    .replace(/(^|[\s([{])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/'/g, "’")
    .replace(/\.\.\./g, "…");
}
