import { useEffect, useState } from "react";
import HeroBanner from "../components/organisms/HeroBanner";
import useGetData from "../hooks/useGetData";
import useUser from "../hooks/useUsername";
import useAddData from "../hooks/useAddData";
import useRemoveData from "../hooks/useRemoveData";
import Alert from "../components/atoms/Alert";
import VideoListVertical from "../components/organisms/VideoListVertical";
import MoviePopUpDetail from "../components/organisms/MoviePopUpDetail";
import VideoListHorizontal from "../components/organisms/VideoListHorizontal";

const FilmsPage = () => {
  const [showPopUpMovieDetail, setShowPopUpMovieDetail] =
    useState<boolean>(false);

  const { user } = useUser();

  const {
    getMovieDetails,
    movieDetail,
    getMovieCertification,
    movieCertification,
    getMovieCredits,
    movieCredits,
    getSimiliarMovies,
    similiarMovies,
    getMovieTrailerKey,
    movieTrailerKey,
    getFavoriteMovies,
    favoriteMovies,
    getMovieTrending,
    movieTrending,
    getMovieAiringToday,
    movieAiringToday,
    getTopRatedMovies,
    topRatedMovies,
    getPopularMovies,
    popularMovies,
    getNewReleaseMovies,
    newReleaseMovies,
  } = useGetData();

  const { addFavoriteMovie, addError, addLoading, addSuccess } = useAddData();

  const { removeFavoriteTVSeries, removeError, removeLoading, removeSuccess } =
    useRemoveData();

  const handleOpenPopUpMovieDetail = (id: number) => {
    setShowPopUpMovieDetail(true);
    getMovieDetails(id);
    getMovieCertification(id);
    getMovieCredits(id);
    getSimiliarMovies(id);
    getMovieTrailerKey(id);
    getFavoriteMovies(user!.id);
  };

  const handleAddFavoriteMovie = (userId: string, videoId: string) => {
    addFavoriteMovie(userId, videoId);
  };

  const handleRemoveFavoriteMovie = (userId: string, videoId: string) => {
    removeFavoriteTVSeries(userId, videoId);
  };

  const handleClosePopUpMovieDetail = () => {
    setShowPopUpMovieDetail(false);
  };

  useEffect(() => {
    getMovieTrending();
    getMovieAiringToday();
    getTopRatedMovies();
    getPopularMovies();
    getNewReleaseMovies();
    getFavoriteMovies(user!.id);
  }, []);

  useEffect(() => {
    getFavoriteMovies(user!.id);
  }, [addSuccess, removeSuccess]);

  return (
    <>
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      <header>
        <HeroBanner
          films={movieTrending}
          handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
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
            label="Tayang Hari Ini"
            films={movieAiringToday}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
          />
          <VideoListVertical
            label="Top Rating Series Hari ini"
            films={topRatedMovies}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteMovies={favoriteMovies}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
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
            label="Rilis Baru"
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
    </>
  );
};

export default FilmsPage;
