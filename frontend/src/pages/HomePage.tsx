import HeroBanner from "../components/organisms/HeroBanner";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import VideoListVertical from "../components/organisms/VideoListVertical";
import useAddData from "../hooks/useAddData";
import useUser from "../hooks/useUsername";
import Alert from "../components/atoms/Alert";
import useRemoveData from "../hooks/useRemoveData";
import MoviePopUpDetail from "../components/molecules/MovieCard/MoviePopUpDetail";

const HomePage = () => {
  const {
    topRatedMovies,
    getTopRatedMovies,
    topRatedTVSeries,
    getTopRatedTVSeries,
    getPopularMovies,
    popularMovies,
    newReleaseMovies,
    getNewReleaseMovies,
    getFavoriteMovies,
    getFavoriteTVSeries,
    favoriteMovies,
    favoriteTVSeries,
  } = useGetData();

  const {
    addFavoriteMovie,
    addFavoriteTVSeries,
    addLoading,
    addError,
    addSuccess,
  } = useAddData();
  const {
    removeFavoriteMovie,
    removeFavoriteTVSeries,
    removeLoading,
    removeError,
    removeSuccess,
  } = useRemoveData();

  const { user } = useUser();

  const handleAddFavoriteMovie = (userId: string, videoId: string) => {
    addFavoriteMovie(userId, videoId);
  };

  const handleAddFavoriteTVSeries = (userId: string, videoId: string) => {
    addFavoriteTVSeries(userId, videoId);
  };

  const handleRemoveFavoriteMovie = (userId: string, videoId: string) => {
    removeFavoriteMovie(userId, videoId);
  };

  const handleRemoveFavoriteTVSeries = (userId: string, videoId: string) => {
    removeFavoriteTVSeries(userId, videoId);
  };

  useEffect(() => {
    getTopRatedMovies();
    getTopRatedTVSeries();
    getPopularMovies();
    getNewReleaseMovies();
    getFavoriteMovies(user!.id);
    getFavoriteTVSeries(user!.id);
  }, []);

  useEffect(() => {
    getFavoriteMovies(user!.id);
    getFavoriteTVSeries(user!.id);
  }, [addSuccess, removeSuccess]);

  return (
    <>
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      <header>{/* <HeroBanner video={films} /> */}</header>
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <VideoListVertical
            label="Top Rating Film dan Series Hari Ini"
            films={topRatedMovies}
            series={topRatedTVSeries}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
            favoriteTVSeries={favoriteTVSeries}
          />
          <VideoListVertical
            label="Film Trending"
            films={popularMovies}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
          />
          <VideoListVertical
            label="Film Rilis Baru"
            films={newReleaseMovies}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
          />
        </section>
      </main>
      <MoviePopUpDetail />
    </>
  );
};

export default HomePage;
