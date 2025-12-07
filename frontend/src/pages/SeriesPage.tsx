import { useEffect, useState } from "react";
import HeroBanner from "../components/organisms/HeroBanner";
import useGetData from "../hooks/useGetData";
import SeriesPopUpDetail from "../components/organisms/SeriesPopUpDetail";
import useUser from "../hooks/useUsername";
import useAddData from "../hooks/useAddData";
import useRemoveData from "../hooks/useRemoveData";
import Alert from "../components/atoms/Alert";
import VideoListVertical from "../components/organisms/VideoListVertical";

const SeriesPage = () => {
  const [showPopUpTVDetail, setShowPopUpTVDetail] = useState<boolean>(false);

  const { user } = useUser();

  const {
    getTVTrending,
    tvTrending,
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
    getFavoriteTVSeries,
    favoriteTVSeries,
    getTVAiringToday,
    tvAiringToday,
    getTopRatedTVSeries,
    topRatedTVSeries,
    getTVPopular,
    tvPopular,
    getNewReleaseTVSeries,
    tvNewRelease,
  } = useGetData();

  const { addFavoriteTVSeries, addError, addLoading, addSuccess } =
    useAddData();

  const { removeFavoriteTVSeries, removeError, removeLoading, removeSuccess } =
    useRemoveData();

  const handleOpenPopUpTVDetail = (id: number) => {
    setShowPopUpTVDetail(true);
    getSeriesDetails(id);
    getTVSeriesContentRating(id);
    getTVSeriesCredits(id);
    getEpisodeSeries(id);
    getTVSeriesTrailerKey(id);
    getFavoriteTVSeries(user!.id);
  };

  const handleAddFavoriteTVSeries = (userId: string, videoId: string) => {
    addFavoriteTVSeries(userId, videoId);
  };

  const handleRemoveFavoriteTVSeries = (userId: string, videoId: string) => {
    removeFavoriteTVSeries(userId, videoId);
  };

  const handleClosePopUpTVDetail = () => {
    setShowPopUpTVDetail(false);
  };

  useEffect(() => {
    getTVTrending();
    getTVAiringToday();
    getTopRatedTVSeries();
    getTVPopular();
    getNewReleaseTVSeries();
    getFavoriteTVSeries(user!.id);
  }, []);

  useEffect(() => {
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
          series={tvTrending}
          handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
        />
      </header>
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <VideoListVertical
            label="Tayang Hari Ini"
            series={tvAiringToday}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteTVSeries={favoriteTVSeries}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
          />
          <VideoListVertical
            label="Top Rating Series Hari ini"
            series={topRatedTVSeries}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteTVSeries={favoriteTVSeries}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
          />
          <VideoListVertical
            label="Series Populer"
            series={tvPopular}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteTVSeries={favoriteTVSeries}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
          />
          <VideoListVertical
            label="Rilis Baru"
            series={tvNewRelease}
            handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
            handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
            addLoading={addLoading}
            removeLoading={removeLoading}
            user={user}
            favoriteTVSeries={favoriteTVSeries}
            handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
          />
        </section>
      </main>
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

export default SeriesPage;
