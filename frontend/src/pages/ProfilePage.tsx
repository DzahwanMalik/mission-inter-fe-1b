import { useEffect, useState } from "react";
import EditProfileForm from "../components/organisms/EditProfileForm";
import SubscribeBanner from "../components/molecules/SubscribeBanner";
import useGetData from "../hooks/useGetData";
import useUser from "../hooks/useUsername";
import useAddData from "../hooks/useAddData";
import useRemoveData from "../hooks/useRemoveData";
import Alert from "../components/atoms/Alert";
import MoviePopUpDetail from "../components/organisms/MoviePopUpDetail";
import SeriesPopUpDetail from "../components/organisms/SeriesPopUpDetail";
import CommonVideoList from "../components/organisms/CommonVideoList";

const ProfilePage = () => {
  const [showPopUpMovieDetail, setShowPopUpMovieDetail] =
    useState<boolean>(false);
  const [showPopUpTVDetail, setShowPopUpTVDetail] = useState<boolean>(false);

  const { user } = useUser();

  const {
    getFavoriteTVSeries,
    favoriteTVSeries,
    getFavoriteMovies,
    favoriteMovies,
    getMovieCredits,
    getMovieDetails,
    getMovieCertification,
    getSimiliarMovies,
    getMovieTrailerKey,
    setMovieTrailerKey,
    getSeriesDetails,
    getTVSeriesContentRating,
    getTVSeriesCredits,
    getTVSeriesTrailerKey,
    getEpisodeSeries,
    setTvTrailerKey,
    movieDetail,
    movieCertification,
    movieCredits,
    similiarMovies,
    movieTrailerKey,
    tvDetail,
    tvCredits,
    tvTrailerKey,
    tvContentRating,
    tvEpisodes,
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
    getFavoriteMovies(user!.id);
    getFavoriteTVSeries(user!.id);
  }, [addSuccess, removeSuccess]);

  useEffect(() => {
    getFavoriteTVSeries(user!.id);
    getFavoriteMovies(user!.id);
    getTopRatedMovies();
    getTVOnTheAir();
  }, []);

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

  return (
    <>
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      <section className="bg-page-header-bg px-5 py-5">
        <div className="w-full max-w-[1444px] m-auto">
          <div className="flex flex-col gap-10 mb-20 md:flex-row-reverse">
            <div className="">
              <SubscribeBanner />
            </div>
            <div className="w-full">
              <EditProfileForm />
            </div>
          </div>
          <div className="col-span-2">
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
          </div>
        </div>
      </section>
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

export default ProfilePage;
