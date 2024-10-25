import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {fetchPokemons, fetchPokemonAdditionalData} from '../Service/pokemonApi';

export interface IPokemon {
  name: string;
  url: string;
  imageUrl: string;
  types: {
    slot: number;
    type: {name: string; url: string};
  }[];
}

interface PokemonContextData {
  pokemons: IPokemon[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  handleRefresh: () => void;
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
    console.log('1');
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

  useEffect(() => {
    loadPokemonData(page);
  }, [page, loadPokemonData]);

  return (
    <PokemonContext.Provider
      value={{pokemons, loading, error, loadMore, handleRefresh}}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextData => {
  const context = useContext(PokemonContext);
  return context;
};
