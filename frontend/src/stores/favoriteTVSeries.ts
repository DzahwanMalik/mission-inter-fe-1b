import { create } from "zustand";
import type DiscoverTVSeries from "../types/discoverTVSeries";

type FavoriteTVSeriesStore = {
  favoriteTVSeries: DiscoverTVSeries[];
  setFavoriteTVSeries: (series: DiscoverTVSeries[]) => void;
};

const useFavoriteTVSeriesStore = create<FavoriteTVSeriesStore>((set) => ({
  favoriteTVSeries: [],
  setFavoriteTVSeries: (series) => set({ favoriteTVSeries: series }),
}));

export default useFavoriteTVSeriesStore;
