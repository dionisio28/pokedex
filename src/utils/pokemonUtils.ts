export function formatPokemonId(id: number): string {
  if (id < 10) {
    return id.toString().padStart(3, '0');
  } else if (id < 100) {
    return id.toString().padStart(3, '0');
  } else {
    return id.toString();
  }
}

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
