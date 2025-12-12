import { useEffect, useState } from "react";
import type DiscoverMovies from "../../../types/discoverMovies";
import type User from "../../../types/user";
import type MovieDetail from "../../../types/movieDetail";
import HoveredMovieCard from "./HoveredMovieCard";
import truncateDescription from "../../../utils/truncateDesc";
import { StarIcon } from "@heroicons/react/20/solid";
import TopRatedBadge from "../TopRatedBadge";
import useGetData from "../../../hooks/useGetData";

type Props = {
  user: User | null;
  video: DiscoverMovies;
  favoriteMovies?: Array<DiscoverMovies>;
  movieDetail: MovieDetail | null;
  handleAddFavoriteMovie?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteMovie?: (userId: string, videoId: string) => void;
  addLoading: boolean;
  removeLoading: boolean;
  getMovieDetails: (id: number) => void;
  handleOpenPopUpMovieDetail?: (id: number) => void;
  aspectRatio: string;
  videoCertification: string | null;
  topRatedMovies?: Array<DiscoverMovies>;
};

const MovieCard = ({
  user,
  video,
  favoriteMovies,
  movieDetail,
  handleAddFavoriteMovie,
  handleRemoveFavoriteMovie,
  addLoading,
  removeLoading,
  getMovieDetails,
  handleOpenPopUpMovieDetail,
  aspectRatio,
  videoCertification,
  topRatedMovies,
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isMobile = window.innerWidth < 768;

  const isTopRated = topRatedMovies?.some((movie) => movie.id === video.id);

  const { getMovieExternalIds, movieExternalIds } = useGetData();

  useEffect(() => {
    if (video.id) {
      getMovieExternalIds(video.id);
    }
  }, [video.id]);

  return (
    <div
      className="relative group w-full cursor-pointer"
      onMouseEnter={() => {
        setHoveredId(video.id);
        getMovieDetails(video.id);
      }}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      onClick={() => {
        if (isMobile) {
          handleOpenPopUpMovieDetail!(video.id);
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
        {isTopRated && <TopRatedBadge />}
        {aspectRatio === "aspect-3/2" && (
          <div className="absolute top-0 left-0 w-full h-full z-10 bg-linear-to-t from-black to-transparent text-text-light-primary p-5 flex items-end">
            <div className="flex items-center justify-between w-full">
              <h2 className="font-semibold">
                {truncateDescription(video.title, 20)}
              </h2>
              <div className="flex items-center gap-1">
                <StarIcon className="size-4" />
                <span>{video.vote_average.toFixed(1)}/10</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <HoveredMovieCard
        user={user}
        video={video}
        favoriteMovies={favoriteMovies}
        movieDetail={movieDetail}
        handleAddFavoriteMovie={handleAddFavoriteMovie}
        handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
        addLoading={addLoading}
        removeLoading={removeLoading}
        hoveredId={hoveredId}
        handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
        videoCertification={videoCertification}
        imdb_id={movieExternalIds?.imdb_id}
      />
    </div>
  );
};

export default MovieCard;
