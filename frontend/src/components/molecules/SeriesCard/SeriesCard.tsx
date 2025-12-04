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
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
      />
    </div>
  );
};

export default SeriesCard;
