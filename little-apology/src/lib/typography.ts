import { site } from "../config/site";

export function smart(text: string) {
  return text
    .replaceAll("{her}", site.names.her)
    .replaceAll("{me}", site.names.me)
    .replace(/(^|[\s([{])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/'/g, "’")
    .replace(/\.\.\./g, "…");
}
