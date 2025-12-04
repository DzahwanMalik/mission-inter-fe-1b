import { useState } from "react";
import axiosTMDB from "../lib/axiosTMDB";
import type MovieDetail from "../types/movieDetail";
import type DiscoverMovies from "../types/discoverMovies";
import type DiscoverTVSeries from "../types/discoverTVSeries";
import type Genres from "../types/genres";
import axiosInstance from "../lib/axios";
import type TVSeriesDetail from "../types/TVSeriesDetail";

const useGetData = () => {
  // Movies
  const [favoriteMovies, setFavoriteMovies] = useState<Array<DiscoverMovies>>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Array<DiscoverMovies>>(
    []
  );
  const [popularMovies, setPopularMovies] = useState<Array<DiscoverMovies>>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<
    Array<DiscoverMovies>
  >([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [movieGenres, setMovieGenres] = useState<Array<Genres>>([]);

  // TV Series
  const [favoriteTVSeries, setFavoriteTVSeries] = useState<Array<DiscoverTVSeries>>([]);
  const [topRatedTVSeries, setTopRatedTVSeries] = useState<
    Array<DiscoverTVSeries>
  >([]);
  const [tvDetail, setTvDetail] = useState<TVSeriesDetail | null>(null);
  const [tvGenres, setTvGenres] = useState<Array<Genres>>([]);

  // Utils
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [getError, setGetError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setGetError(err);
  };

  const getTopRatedMovies = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(
        "/movie/top_rated?language=en-US&page=1"
      );
      setTopRatedMovies(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTopRatedTVSeries = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(
        "/tv/top_rated?language=en-US&page=1"
      );
      setTopRatedTVSeries(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getPopularMovies = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(
        "/movie/popular?language=en-US&page=1"
      );
      setPopularMovies(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getNewReleaseMovies = async () => {
    setGetLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await axiosTMDB.get(`/discover/movie`, {
        params: {
          language: "en-US",
          sort_by: "primary_release_date.desc",
          "release_date.lte": today,
          page: 1,
        },
      });
      setNewReleaseMovies(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieGenres = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get("/genre/movie/list", {
        params: {
          language: "en-US",
        },
      });
      setMovieGenres(response?.data.genres);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieDetails = async (movieId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/movie/${movieId}`, {
        params: {
          language: "en-US",
        },
      });
      setMovieDetail(response?.data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVSeriesGenres = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get("/genre/tv/list", {
        params: {
          language: "en-US",
        },
      });
      setTvGenres(response?.data.genres);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getSeriesDetails = async (seriesId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/${seriesId}`, {
        params: {
          language: "en-US",
        },
      });
      setTvDetail(response?.data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getFavoriteMovies = async (userId: string) => {
    setGetLoading(true);
    try {
      const response = await axiosInstance.get(`/user/favorite/movie/${userId}`);
      setFavoriteMovies(response?.data?.data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getFavoriteTVSeries = async (userId: string) => {
    setGetLoading(true);
    try {
      const response = await axiosInstance.get(`/user/favorite/tv/${userId}`);
      setFavoriteTVSeries(response?.data?.data);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  return {
    topRatedMovies,
    getTopRatedMovies,
    getMovieDetails,
    getLoading,
    getError,
    movieDetail,
    topRatedTVSeries,
    getTopRatedTVSeries,
    getSeriesDetails,
    tvDetail,
    popularMovies,
    getPopularMovies,
    newReleaseMovies,
    getNewReleaseMovies,
    movieGenres,
    getMovieGenres,
    tvGenres,
    getTVSeriesGenres,
    favoriteMovies,
    getFavoriteMovies,
    favoriteTVSeries,
    getFavoriteTVSeries,
  };
};

export default useGetData;
