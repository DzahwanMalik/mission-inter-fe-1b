import { useEffect, useState } from "react";
import type User from "../../../types/user";
import HoveredSeriesCard from "./HoveredSeriesCard";
import type DiscoverTVSeries from "../../../types/discoverTVSeries";
import type TVSeriesDetail from "../../../types/TVSeriesDetail";
import { StarIcon } from "@heroicons/react/20/solid";
import truncateDescription from "../../../utils/truncateDesc";
import NewEpisodeBadge from "../NewEpisodeBadge";
import useGetData from "../../../hooks/useGetData";

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
  aspectRatio: string;
  videoContentRatings: string | null;
  newEpisode?: Array<DiscoverTVSeries>;
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
  aspectRatio,
  videoContentRatings,
  newEpisode,
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isMobile = window.innerWidth < 768;

  const isNewEpisode = newEpisode?.some((episode) => episode.id === video.id);

  const { getTVSeriesExternalIds, tvExternalIds } = useGetData();

  useEffect(() => {
    if (video.id) {
      getTVSeriesExternalIds(video.id);
    }
  }, [video.id]);

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
      <div className={`${aspectRatio} relative rounded-xl overflow-hidden`}>
        {/* Thumbnail */}
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
            aspectRatio === "aspect-3/2"
              ? video.backdrop_path
              : video.poster_path
          }`}
          className="w-full h-full object-cover object-center"
          alt=""
          loading="lazy"
        />
        {isNewEpisode && <NewEpisodeBadge />}
        {aspectRatio === "aspect-3/2" && (
          <div className="absolute top-0 left-0 w-full h-full z-10 bg-linear-to-t from-black to-transparent text-text-light-primary p-5 flex items-end">
            <div className="flex items-center justify-between w-full">
              <h2 className="font-semibold">
                {truncateDescription(video.original_name, 20)}
              </h2>
              <div className="flex items-center gap-1">
                <StarIcon className="size-4" />
                <span>{video.vote_average.toFixed(1)}/10</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <HoveredSeriesCard
        user={user}
        video={video}
        videoContentRatings={videoContentRatings}
        favoriteTVSeries={favoriteTVSeries}
        tvDetail={tvDetail}
        handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
        handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
        addLoading={addLoading}
        removeLoading={removeLoading}
        hoveredId={hoveredId}
        handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
        imdb_id={tvExternalIds?.imdb_id}
      />
    </div>
  );
};

export default SeriesCard;
