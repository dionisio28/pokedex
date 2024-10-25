export const color = {
  black: '#000',
  white: '#fff',
};

type PokemonType =
  | 'grass'
  | 'poison'
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

export const pokemonColorByTypes: Record<PokemonType, string> = {
  grass: '#48CFB2',
  poison: '#A040A0',
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};
