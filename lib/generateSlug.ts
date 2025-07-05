

export function generateSlug(title: string = ""): string {
  if (typeof title !== "string") return "";

  return title
    .toLowerCase()                      // Lowercase the title
    .trim()                             // Remove leading/trailing spaces
    .replace(/\s+/g, "-")               // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "")           // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, "-")             // Replace multiple hyphens with a single one
    .replace(/^-+/, "")                 // Trim hyphens from start
    .replace(/-+$/, "");                // Trim hyphens from end
     
}
