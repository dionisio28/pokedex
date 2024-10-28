import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  fetchPokemons,
  fetchPokemonAdditionalData,
  searchPokemonByName,
  fetchPokemonDetails,
} from '../service/pokemonApi';
import debounce from 'lodash.debounce';

export interface IPokemon {
  name: string;
  id: number;
  url: string;
  imageUrl: string;
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
}

export interface IPokemonDetails {
  name: string;
  id: string;
  imageUrl: string;
  types: {name: string}[];
  abilities: {name: string}[];
  stats: {name: string; value: number}[];
}

interface PokemonContextData {
  pokemons: IPokemon[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  handleRefresh: () => void;
  handleSearch: (name: string) => void;
  getPokemonDetails: (name: string) => Promise<IPokemonDetails | null>;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

export const PokemonProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  const getPokemonImage = async (
    pokemonList: {name: string; url: string}[],
  ): Promise<IPokemon[]> => {
    return Promise.all(
      pokemonList.map(async pokemon => {
        const additionalData = await fetchPokemonAdditionalData(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          ...additionalData,
        };
      }),
    );
  };

  const loadPokemonData = useCallback(async (currentPage: number) => {
    setLoading(true);
    setError(null);

    try {
      const offset = currentPage * 10;
      const pokemonList = await fetchPokemons(offset);
      const pokemonData = await getPokemonImage(pokemonList);

      if (currentPage === 0) {
        setPokemons(pokemonData);
      } else {
        setPokemons(prevPokemons => [...prevPokemons, ...pokemonData]);
      }
    } catch (err) {
      setError('Failed to load Pokémons');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRefresh = async () => {
    if (page > 0) {
      setPokemons([]);
      setPage(0);
    }
  };

  const searchPokemon = async (name: string) => {
    setLoading(true);
    setError(null);
    setPage(0);
    try {
      const pokemon = await searchPokemonByName(name);
      if (pokemon) {
        setPokemons([]);
        setPokemons([pokemon]);
      } else {
        setError('No Pokémon found');
        setPokemons([]);
      }
    } catch (err) {
      setError('Failed to search Pokémon');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchPokemon = useCallback(
    debounce((name: string) => {
      if (name.trim()) {
        searchPokemon(name);
      } else {
        handleRefresh();
      }
    }, 700),
    [],
  );

  const handleSearch = (name: string) => {
    debouncedSearchPokemon(name);
  };

  const getPokemonDetails = async (
    name: string,
  ): Promise<IPokemonDetails | null> => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonDetails(name);
      if (!data) {
        setError('Pokémon not found. Please try another name.');
        return null;
      }

      return {
        name: data.name,
        id: data.id,
        imageUrl: data.sprites.front_default,
        types: data.types.map(t => ({name: t.type.name})),
        abilities: data.abilities.map(a => ({name: a.ability.name})),
        stats: data.stats.map(s => ({name: s.stat.name, value: s.base_stat})),
      };
    } catch (err) {
      setError(
        'An error occurred while fetching Pokémon details. Please try again.',
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemonData(page);
  }, [page, loadPokemonData]);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        loading,
        error,
        loadMore,
        handleRefresh,
        handleSearch,
        getPokemonDetails,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextData => {
  const context = useContext(PokemonContext);
  return context;
};
