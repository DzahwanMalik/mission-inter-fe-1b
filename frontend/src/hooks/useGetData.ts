import { useState } from "react";
import axiosTMDB from "../lib/axiosTMDB";
import type MovieDetail from "../types/movieDetail";
import type DiscoverMovies from "../types/discoverMovies";
import type DiscoverTVSeries from "../types/discoverTVSeries";
import type Genres from "../types/genres";
import axiosInstance from "../lib/axios";
import type TVSeriesDetail from "../types/TVSeriesDetail";
import type VideoCredits from "../types/videoCredits";
import type AllTrending from "../types/allTrending";

const useGetData = () => {
  // Common
  const [allTrending, setAllTrending] = useState<Array<AllTrending>>([]);

  // Movies
  const [favoriteMovies, setFavoriteMovies] = useState<Array<DiscoverMovies>>(
    []
  );
  const [topRatedMovies, setTopRatedMovies] = useState<Array<DiscoverMovies>>(
    []
  );
  const [popularMovies, setPopularMovies] = useState<Array<DiscoverMovies>>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<
    Array<DiscoverMovies>
  >([]);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [movieGenres, setMovieGenres] = useState<Array<Genres>>([]);
  const [movieCertification, setMovieCertification] = useState<string | null>(
    null
  );
  const [movieCredits, setMovieCredits] = useState<VideoCredits | null>(null);
  const [similiarMovies, setSimiliarMovies] = useState<Array<DiscoverMovies>>(
    []
  );
  const [movieTrailerKey, setMovieTrailerKey] = useState<string | null>(null);
  const [movieTrending, setMovieTrending] = useState<Array<DiscoverMovies>>([]);
  const [movieAiringToday, setMovieAiringToday] = useState<
    Array<DiscoverMovies>
  >([]);
  const [movieByGenre, setMovieByGenre] = useState<Array<DiscoverMovies>>([]);

  // TV Series
  const [favoriteTVSeries, setFavoriteTVSeries] = useState<
    Array<DiscoverTVSeries>
  >([]);
  const [topRatedTVSeries, setTopRatedTVSeries] = useState<
    Array<DiscoverTVSeries>
  >([]);
  const [tvDetail, setTvDetail] = useState<TVSeriesDetail | null>(null);
  const [tvGenres, setTvGenres] = useState<Array<Genres>>([]);
  const [tvCredits, setTvCredits] = useState<VideoCredits | null>(null);
  const [tvContentRating, setTvContentRating] = useState<string | null>(null);
  const [tvEpisodes, setTvEpisodes] = useState<Array<EpisodeSeries>>([]);
  const [tvTrailerKey, setTvTrailerKey] = useState<string | null>(null);
  const [tvTrending, setTvTrending] = useState<Array<DiscoverTVSeries>>([]);
  const [tvAiringToday, setTvAiringToday] = useState<Array<DiscoverTVSeries>>(
    []
  );
  const [tvPopular, setTvPopular] = useState<Array<DiscoverTVSeries>>([]);
  const [tvNewRelease, setTvNewRelease] = useState<Array<DiscoverTVSeries>>([]);
  const [tvByGenre, setTvByGenre] = useState<Array<DiscoverTVSeries>>([]);
  const [tvOnTheAir, setTvOnTheAir] = useState<Array<DiscoverTVSeries>>([]);

  // Utils
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [getError, setGetError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setGetError(err);
  };

  const getAllTrending = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get("/trending/all/week");
      setAllTrending(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
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
      const response = await axiosInstance.get(
        `/user/favorite/movie/${userId}`
      );
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

  const getMovieCertification = async (movieId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/movie/${movieId}/release_dates`);

      const result = response?.data?.results;

      const certification = result?.find(
        (item: any) => item.iso_3166_1 === "US"
      );

      setMovieCertification(
        certification?.release_dates[0]?.certification || "NR"
      );
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVSeriesContentRating = async (seriesId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/${seriesId}/content_ratings`);

      const result = response?.data?.results;

      const contentRating = result?.find(
        (item: any) => item.iso_3166_1 === "US"
      );

      setTvContentRating(contentRating?.rating || "NR");
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieCredits = async (movieId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`movie/${movieId}/credits`, {
        params: {
          language: "en-US",
        },
      });
      setMovieCredits(response?.data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVSeriesCredits = async (seriesId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`tv/${seriesId}/credits`, {
        params: {
          language: "en-US",
        },
      });
      setTvCredits(response?.data);
    } catch (error: any) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getSimiliarMovies = async (movieId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/movie/${movieId}/similar`, {
        params: {
          language: "en-US",
          page: 1,
        },
      });
      setSimiliarMovies(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getEpisodeSeries = async (seriesId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/${seriesId}/season/1`, {
        params: {
          language: "en-US",
        },
      });
      setTvEpisodes(response?.data?.episodes);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieTrailerKey = async (movieId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/movie/${movieId}/videos`);
      setMovieTrailerKey(response?.data?.results[0]?.key);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVSeriesTrailerKey = async (seriesId: number) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/${seriesId}/videos`);
      setTvTrailerKey(response?.data?.results[0]?.key);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVTrending = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/trending/tv/week`);
      setTvTrending(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVAiringToday = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/airing_today`);
      setTvAiringToday(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVPopular = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/popular`);
      setTvPopular(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getNewReleaseTVSeries = async () => {
    setGetLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await axiosTMDB.get(`/discover/tv`, {
        params: {
          language: "en-US",
          sort_by: "primary_release_date.desc",
          "release_date.lte": today,
          page: 1,
        },
      });
      setTvNewRelease(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieAiringToday = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/movie/now_playing`);
      setMovieAiringToday(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieTrending = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/trending/movie/week`);
      setMovieTrending(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getMovieByGenre = async (genreId: string) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/discover/movie`, {
        params: {
          language: "en-US",
          with_genres: genreId,
          page: 1,
        },
      });
      setMovieByGenre(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVByGenre = async (genreId: string) => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/discover/tv`, {
        params: {
          language: "en-US",
          with_genres: genreId,
          page: 1,
        },
      });
      setTvByGenre(response?.data.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  const getTVOnTheAir = async () => {
    setGetLoading(true);
    try {
      const response = await axiosTMDB.get(`/tv/on_the_air`, {
        params: {
          language: "en-US",
          page: 1,
        },
      });
      setTvOnTheAir(response?.data?.results);
    } catch (error: any) {
      handleError(error.message);
    } finally {
      setGetLoading(false);
    }
  };

  return {
    allTrending,
    getAllTrending,
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
    movieCertification,
    getMovieCertification,
    getMovieCredits,
    movieCredits,
    similiarMovies,
    getSimiliarMovies,
    tvCredits,
    getTVSeriesCredits,
    tvContentRating,
    getTVSeriesContentRating,
    tvEpisodes,
    getEpisodeSeries,
    movieTrailerKey,
    getMovieTrailerKey,
    setMovieTrailerKey,
    tvTrailerKey,
    getTVSeriesTrailerKey,
    setTvTrailerKey,
    tvTrending,
    getTVTrending,
    tvAiringToday,
    getTVAiringToday,
    tvPopular,
    getTVPopular,
    tvNewRelease,
    getNewReleaseTVSeries,
    movieTrending,
    getMovieTrending,
    movieAiringToday,
    getMovieAiringToday,
    movieByGenre,
    getMovieByGenre,
    tvByGenre,
    getTVByGenre,
    tvOnTheAir,
    getTVOnTheAir,
  };
};

export default useGetData;
