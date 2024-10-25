import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import api from '../Service/api';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
  next: string | null;
}

interface PokemonContextData {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
}

const PokemonContext = createContext<PokemonContextData>({
  pokemons: [],
  loading: false,
  error: null,
  loadMore: () => null,
});

export const PokemonProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);

  const getPokemons = useCallback(async (currentPage: number) => {
    setLoading(true);
    setError(null);

    try {
      const offset = currentPage * 10;
      const response = await api.get<PokemonResponse>(
        `pokemon?limit=10&offset=${offset}`,
      );
      console.log('response', response.data.results[0]);
      setPokemons(prevPokemons => [...prevPokemons, ...response.data.results]);
    } catch (err) {
      setError('Failed to load Pokémons');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    getPokemons(page);
  }, [page, getPokemons]);

  return (
    <PokemonContext.Provider value={{pokemons, loading, error, loadMore}}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextData => {
  const context = useContext(PokemonContext);
  return context;
};
