export function generateInitials(name: string) {
  // Split the name into words
  const words = name.split(" ");

  // Initialize variables to store initials
  const firstInitial = words[0][0].toUpperCase();
  let secondInitial = "";
  // Get the second initial from the last word
  if (words.length > 1) {
    secondInitial = words[1][0].toUpperCase();
  }

  // Return the generated initials
  return firstInitial + secondInitial;
}
