import { useState } from "react";
import type User from "../../../types/user";
import HoveredSeriesCard from "./HoveredSeriesCard";
import type DiscoverTVSeries from "../../../types/discoverTVSeries";
import type TVSeriesDetail from "../../../types/TVSeriesDetail";

type Props = {
  user: User | null;
  video: DiscoverTVSeries;
  favoriteTVSeries?: Array<DiscoverTVSeries>;
  tvDetail: TVSeriesDetail | null;
  handleAddFavoriteTVSeries?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteTVSeries?: (userId: string, videoId: string) => void;
  addLoading: boolean;
  removeLoading: boolean;
  getSeriesDetails: (id: number) => void;
  handleOpenPopUpTVDetail?: (videoId: number) => void;
};

const SeriesCard = ({
  user,
  video,
  favoriteTVSeries,
  tvDetail,
  handleAddFavoriteTVSeries,
  handleRemoveFavoriteTVSeries,
  addLoading,
  removeLoading,
  getSeriesDetails,
  handleOpenPopUpTVDetail,
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="relative group w-full cursor-pointer"
      onMouseEnter={() => {
        setHoveredId(video.id);
        getSeriesDetails(video.id);
      }}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      onClick={() => {
        if (isMobile) {
          handleOpenPopUpTVDetail!(video.id);
        }
      }}
    >
      <div className="aspect-2/3">
        {/* Thumbnail */}
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${video.poster_path}`}
          className="w-full h-full object-cover object-center rounded-xl"
          alt=""
          loading="lazy"
        />
      </div>

      <HoveredSeriesCard
        user={user}
        video={video}
        favoriteTVSeries={favoriteTVSeries}
        tvDetail={tvDetail}
        handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
        handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
        addLoading={addLoading}
        removeLoading={removeLoading}
        hoveredId={hoveredId}
        handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
      />
    </div>
  );
};

export default SeriesCard;
