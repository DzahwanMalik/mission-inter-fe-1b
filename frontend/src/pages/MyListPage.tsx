import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import useAddData from "../hooks/useAddData";
import useUser from "../hooks/useUsername";
import Alert from "../components/atoms/Alert";
import useRemoveData from "../hooks/useRemoveData";
import MoviePopUpDetail from "../components/organisms/MoviePopUpDetail";
import SeriesPopUpDetail from "../components/organisms/SeriesPopUpDetail";
import CommonVideoList from "../components/organisms/CommonVideoList";

const MyListPage = () => {
  const [showPopUpMovieDetail, setShowPopUpMovieDetail] =
    useState<boolean>(false);
  const [showPopUpTVDetail, setShowPopUpTVDetail] = useState<boolean>(false);

  const {
    getFavoriteMovies,
    getFavoriteTVSeries,
    favoriteMovies,
    favoriteTVSeries,
    getMovieDetails,
    movieDetail,
    getSeriesDetails,
    tvDetail,
    getMovieCertification,
    movieCertification,
    getMovieCredits,
    movieCredits,
    getSimiliarMovies,
    similiarMovies,
    getTVSeriesCredits,
    tvCredits,
    getTVSeriesContentRating,
    tvContentRating,
    getEpisodeSeries,
    tvEpisodes,
    getMovieTrailerKey,
    movieTrailerKey,
    setMovieTrailerKey,
    getTVSeriesTrailerKey,
    tvTrailerKey,
    setTvTrailerKey,
    getTopRatedMovies,
    topRatedMovies,
    getTVOnTheAir,
    tvOnTheAir,
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

  const handleOpenPopUpMovieDetail = (id: number) => {
    setShowPopUpMovieDetail(true);
    getMovieDetails(id);
    getMovieCertification(id);
    getMovieCredits(id);
    getSimiliarMovies(id);
    getMovieTrailerKey(id);
  };

  const handleClosePopUpMovieDetail = () => {
    setShowPopUpMovieDetail(false);
    setMovieTrailerKey(null);
  };

  const handleOpenPopUpTVDetail = (id: number) => {
    setShowPopUpTVDetail(true);
    getSeriesDetails(id);
    getTVSeriesCredits(id);
    getTVSeriesContentRating(id);
    getEpisodeSeries(id);
    getTVSeriesTrailerKey(id);
  };

  const handleClosePopUpTVDetail = () => {
    setShowPopUpTVDetail(false);
    setTvTrailerKey(null);
  };

  useEffect(() => {
    getFavoriteMovies(user!.id);
    getFavoriteTVSeries(user!.id);
  }, [addSuccess, removeSuccess]);

  useEffect(() => {
    getFavoriteTVSeries(user!.id);
    getFavoriteMovies(user!.id);
    getTopRatedMovies();
    getTVOnTheAir();
  }, []);

  return (
    <>
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <CommonVideoList
            films={favoriteMovies}
            series={favoriteTVSeries}
            label="Daftar Saya"
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
            topRatedMovies={topRatedMovies}
            newEpisode={tvOnTheAir}
            favoriteMovies={favoriteMovies}
            favoriteTVSeries={favoriteTVSeries}
          />
        </section>
      </main>
      <MoviePopUpDetail
        isShow={showPopUpMovieDetail}
        videoDetail={movieDetail}
        videoCertification={movieCertification}
        videoCredits={movieCredits}
        videoSimilar={similiarMovies}
        videoTrailerKey={movieTrailerKey}
        handleClose={handleClosePopUpMovieDetail}
        handleAddFavoriteMovie={handleAddFavoriteMovie}
        handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
        addLoading={addLoading}
        removeLoading={removeLoading}
        favoriteMovies={favoriteMovies}
        user={user}
      />
      <SeriesPopUpDetail
        isShow={showPopUpTVDetail}
        videoDetail={tvDetail}
        videoCredits={tvCredits}
        videoContentRatings={tvContentRating}
        videoTrailerKey={tvTrailerKey}
        videoEpisodes={tvEpisodes}
        handleClose={handleClosePopUpTVDetail}
        handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
        handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
        addLoading={addLoading}
        removeLoading={removeLoading}
        favoriteTVSeries={favoriteTVSeries}
        user={user}
      />
    </>
  );
};

export default MyListPage;
