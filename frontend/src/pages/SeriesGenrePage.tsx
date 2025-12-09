import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import useAddData from "../hooks/useAddData";
import useUser from "../hooks/useUsername";
import Alert from "../components/atoms/Alert";
import useRemoveData from "../hooks/useRemoveData";
import { useParams } from "react-router";
import SeriesPopUpDetail from "../components/organisms/SeriesPopUpDetail";
import CommonVideoList from "../components/organisms/CommonVideoList";

const SeriesGenrePage = () => {
  const genreId = useParams().id;

  const [showPopUpTVDetail, setShowPopUpTVDetail] = useState<boolean>(false);

  const {
    getFavoriteTVSeries,
    favoriteTVSeries,
    getSeriesDetails,
    tvDetail,
    getTVSeriesContentRating,
    tvContentRating,
    getTVSeriesCredits,
    tvCredits,
    getEpisodeSeries,
    tvEpisodes,
    getTVSeriesTrailerKey,
    tvTrailerKey,
    setTvTrailerKey,
    getTVByGenre,
    tvByGenre,
    getTVSeriesGenres,
    tvGenres,
    getTVOnTheAir,
    tvOnTheAir,
  } = useGetData();

  const { addFavoriteTVSeries, addLoading, addError, addSuccess } =
    useAddData();

  const { removeFavoriteTVSeries, removeLoading, removeError, removeSuccess } =
    useRemoveData();

  const { user } = useUser();

  const handleAddFavoriteTVSeries = (userId: string, videoId: string) => {
    addFavoriteTVSeries(userId, videoId);
  };

  const handleRemoveFavoriteTVSeries = (userId: string, videoId: string) => {
    removeFavoriteTVSeries(userId, videoId);
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
    getFavoriteTVSeries(user!.id);
    getTVByGenre(genreId!);
  }, [addSuccess, removeSuccess]);

  useEffect(() => {
    getFavoriteTVSeries(user!.id);
    getTVByGenre(genreId!);
    getTVSeriesGenres();
    getTVOnTheAir();
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
            series={tvByGenre}
            favoriteTVSeries={favoriteTVSeries}
            label={`Hasil Pencarian Untuk Genre ${
              tvGenres.find((genre) => genre.id === Number(genreId))?.name
            }`}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
            newEpisode={tvOnTheAir}
          />
        </section>
      </main>
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

export default SeriesGenrePage;
