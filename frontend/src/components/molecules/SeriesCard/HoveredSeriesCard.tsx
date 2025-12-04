import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import Button from "../../atoms/Button";
import type User from "../../../types/user";
import Chip from "../../atoms/Chip";
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
  hoveredId: number | null;
  handleOpenPopUpTVDetail?: (videoId: number) => void;
};

const HoveredSeriesCard = ({
  user,
  video,
  favoriteTVSeries,
  tvDetail,
  handleAddFavoriteTVSeries,
  handleRemoveFavoriteTVSeries,
  addLoading,
  removeLoading,
  hoveredId,
  handleOpenPopUpTVDetail,
}: Props) => {
  return (
    <div
      className="
            absolute left-1/2 -translate-1/2 top-1/2 w-72 rounded-xl bg-page-header-bg text-white shadow-2xl
            opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
            transition-all duration-300
            z-999
        "
    >
      <img
        src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${video.backdrop_path}`}
        className="w-full h-36 object-cover object-center rounded-lg"
        loading="lazy"
      />

      <div className="p-4 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              value={<PlayIcon className="size-4" />}
              variant="secondary"
            />
            <Button
              type="button"
              value={
                addLoading || removeLoading ? (
                  "..."
                ) : (
                  <CheckIcon className="size-4" />
                )
              }
              variant={
                favoriteTVSeries?.some((m) => m.id === video.id)
                  ? "primary"
                  : "secondaryOutline"
              }
              handleClick={
                favoriteTVSeries?.some((m) => m.id === video.id)
                  ? () => {
                      handleRemoveFavoriteTVSeries?.(
                        user?.id.toString() ?? "",
                        video.id.toString()
                      );
                    }
                  : () => {
                      handleAddFavoriteTVSeries?.(
                        user?.id.toString() ?? "",
                        video.id.toString()
                      );
                    }
              }
            />
          </div>
          <div>
            <Button
              type="button"
              value={<ChevronDownIcon className="size-4" />}
              variant="secondaryOutline"
              handleClick={() => handleOpenPopUpTVDetail?.(video.id)}
            />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Chip
            value={tvDetail?.adult ? "18+" : "13+"}
            variant="secondary"
            size="small"
          />
          <p className="font-semibold text-sm">
            {hoveredId === video.id
              ? tvDetail?.number_of_episodes + " Episodes"
              : ""}
          </p>
        </div>
        <ul className="flex justify-around items-center text-text-light-secondary font-semibold">
          {tvDetail?.genres?.slice(0, 2).map((g, i) => (
            <>
              <li key={i} className="whitespace-nowrap">
                {g.name}
              </li>
              {i !== (tvDetail?.genres.slice(0, 2).length ?? 0) - 1 && (
                <span>•</span>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HoveredSeriesCard;
