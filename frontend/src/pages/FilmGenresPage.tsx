import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import useAddData from "../hooks/useAddData";
import useUser from "../hooks/useUsername";
import Alert from "../components/atoms/Alert";
import useRemoveData from "../hooks/useRemoveData";
import MoviePopUpDetail from "../components/organisms/MoviePopUpDetail";
import { useParams } from "react-router";
import CommonVideoList from "../components/organisms/CommonVideoList";

const FilmGenresPage = () => {
  const genreId = useParams().id;

  const [showPopUpMovieDetail, setShowPopUpMovieDetail] =
    useState<boolean>(false);

  const {
    getFavoriteMovies,
    favoriteMovies,
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
    setMovieTrailerKey,
    getMovieByGenre,
    movieByGenre,
    getMovieGenres,
    movieGenres,
    getTopRatedMovies,
    topRatedMovies,
  } = useGetData();

  const { addFavoriteMovie, addLoading, addError, addSuccess } = useAddData();

  const { removeFavoriteMovie, removeLoading, removeError, removeSuccess } =
    useRemoveData();

  const { user } = useUser();

  const handleAddFavoriteMovie = (userId: string, videoId: string) => {
    addFavoriteMovie(userId, videoId);
  };

  const handleRemoveFavoriteMovie = (userId: string, videoId: string) => {
    removeFavoriteMovie(userId, videoId);
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

  useEffect(() => {
    getFavoriteMovies(user!.id);
    getMovieByGenre(genreId!);
  }, [addSuccess, removeSuccess]);

  useEffect(() => {
    getFavoriteMovies(user!.id);
    getMovieByGenre(genreId!);
    getMovieGenres();
    getTopRatedMovies();
  }, [genreId]);

  return (
    <>
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <CommonVideoList
            films={movieByGenre}
            favoriteMovies={favoriteMovies}
            label={`Hasil Pencarian Untuk Genre ${
              movieGenres.find((genre) => genre.id === Number(genreId))?.name
            }`}
            handleAddFavoriteMovie={handleAddFavoriteMovie}
            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
            addLoading={addLoading}
            removeLoading={removeLoading}
            handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
            topRatedMovies={topRatedMovies}
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

export default FilmGenresPage;
