import {IPokemon} from 'src/context/PokemonContext';
import api from './api';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
}

interface PokemonDetails {
  name: string;
  id: string;
  sprites: {
    front_default: string;
    other?: any
  };
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
  abilities: {
    ability: {name: string; url: string};
  }[];
  stats: {
    base_stat: number;
    stat: {name: string};
  }[];
  height: number;
  weight: number;
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
  id: number;
}> => {
  try {
    const response = await api.get<PokemonDetail>(pokemonUrl);

    return {
      imageUrl: response.data.sprites.front_default,
      types: response.data.types,
      id: response.data.id,
    };
  } catch (error) {
    return {
      imageUrl: '',
      types: [],
      id: 0,
    };
  }
};

export const searchPokemonByName = async (
  name: string,
): Promise<IPokemon | null> => {
  try {
    const response = await api.get<PokemonDetail>(
      `pokemon/${name.toLowerCase()}`,
    );
    return {
      name: response.data.name,
      id: response.data.id,
      url: `https://pokeapi.co/api/v2/pokemon/${response.data.name}`,
      imageUrl: response.data.sprites.front_default,
      types: response.data.types,
    };
  } catch (error) {
    return null;
  }
};

export const fetchPokemonDetails = async (
  name: string,
): Promise<PokemonDetails | null> => {
  try {
    const response = await api.get<PokemonDetails>(
      `pokemon/${name.toLowerCase()}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};
