import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import VideoListVertical from "../components/organisms/VideoListVertical";
import useAddData from "../hooks/useAddData";
import useUser from "../hooks/useUsername";
import Alert from "../components/atoms/Alert";
import useRemoveData from "../hooks/useRemoveData";
import MoviePopUpDetail from "../components/organisms/MoviePopUpDetail";
import SeriesPopUpDetail from "../components/organisms/SeriesPopUpDetail";
import HeroBanner from "../components/organisms/HeroBanner";
import VideoListHorizontal from "../components/organisms/VideoListHorizontal";

const HomePage = () => {
  const [showPopUpMovieDetail, setShowPopUpMovieDetail] =
    useState<boolean>(false);
  const [showPopUpTVDetail, setShowPopUpTVDetail] = useState<boolean>(false);

  const {
    allTrending,
    getAllTrending,
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
    getAllTrending();
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
      <header>
        <HeroBanner
          video={allTrending}
          handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
          handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
        />
      </header>
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <VideoListHorizontal 
            label="Melanjutkan Tonton Film"
            films={favoriteMovies}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
          />
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
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
          />
          <VideoListVertical
            label="Film Populer"
            films={popularMovies}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
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
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
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
        videoContentRatings={tvContentRating}
        videoCredits={tvCredits}
        videoEpisodes={tvEpisodes}
        videoTrailerKey={tvTrailerKey}
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

export default HomePage;
