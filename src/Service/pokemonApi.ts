import api from './api';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
}

interface PokemonResponse {
  results: Pokemon[];
  next: string | null;
}

export const fetchPokemons = async (
  offset: number = 0,
  limit: number = 10,
): Promise<Pokemon[]> => {
  try {
    const response = await api.get<PokemonResponse>(
      `pokemon?limit=${limit}&offset=${offset}`,
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémons:', error);
    return [];
  }
};

export const fetchPokemonAdditionalData = async (
  pokemonUrl: string,
): Promise<{
  imageUrl: string;
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
}> => {
  try {
    const response = await api.get<PokemonDetail>(pokemonUrl);
    return {
      imageUrl: response.data.sprites.front_default,
      types: response.data.types,
    };
  } catch (error) {
    return {
      imageUrl: '',
      types: [],
    };
  }
};
