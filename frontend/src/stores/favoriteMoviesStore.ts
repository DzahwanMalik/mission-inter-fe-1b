import { create } from "zustand";
import type DiscoverMovies from "../types/discoverMovies";

type FavoriteMoviesStore = {
  favoriteMovies: DiscoverMovies[];
  setFavoriteMovies: (movies: DiscoverMovies[]) => void;
};

const useFavoriteMoviesStore = create<FavoriteMoviesStore>((set) => ({
  favoriteMovies: [],
  setFavoriteMovies: (movies) => set({ favoriteMovies: movies }),
}));

export default useFavoriteMoviesStore;
