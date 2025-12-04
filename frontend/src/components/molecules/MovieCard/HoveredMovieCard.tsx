import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import type DiscoverMovies from "../../../types/discoverMovies";
import Button from "../../atoms/Button";
import type User from "../../../types/user";
import Chip from "../../atoms/Chip";
import type MovieDetail from "../../../types/movieDetail";

type Props = {
  user: User | null;
  video: DiscoverMovies;
  favoriteMovies?: Array<DiscoverMovies>;
  movieDetail: MovieDetail | null;
  handleAddFavoriteMovie?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteMovie?: (userId: string, videoId: string) => void;
  addLoading: boolean;
  removeLoading: boolean;
  hoveredId: number | null;
};

const HoveredMovieCard = ({
  user,
  video,
  favoriteMovies,
  movieDetail,
  handleAddFavoriteMovie,
  handleRemoveFavoriteMovie,
  addLoading,
  removeLoading,
  hoveredId,
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
                favoriteMovies?.some((m) => m.id === video.id)
                  ? "primary"
                  : "secondaryOutline"
              }
              handleClick={
                favoriteMovies?.some((m) => m.id === video.id)
                  ? () => {
                      handleRemoveFavoriteMovie?.(
                        user?.id.toString() ?? "",
                        video.id.toString()
                      );
                    }
                  : () => {
                      handleAddFavoriteMovie?.(
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
            />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Chip
            value={video.adult ? "18+" : "13+"}
            variant="secondary"
            size="small"
          />
          <p className="font-semibold text-sm">
            {hoveredId === video.id
              ? Math.floor((movieDetail?.runtime ?? 0) / 60) +
                "h " +
                ((movieDetail?.runtime ?? 0) % 60) +
                "m"
              : ""}
          </p>
        </div>
        <ul className="flex justify-around items-center text-text-light-secondary font-semibold">
          {movieDetail?.genres?.slice(0, 2).map((g, i) => (
            <>
              <li key={i} className="whitespace-nowrap">
                {g.name}
              </li>
              {i !== (movieDetail?.genres.slice(0, 2).length ?? 0) - 1 && (
                <span>•</span>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HoveredMovieCard;
