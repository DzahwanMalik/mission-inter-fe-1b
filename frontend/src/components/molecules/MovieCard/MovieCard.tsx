import { useState } from "react";
import type DiscoverMovies from "../../../types/discoverMovies";
import type User from "../../../types/user";
import type MovieDetail from "../../../types/movieDetail";
import HoveredMovieCard from "./HoveredMovieCard";

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
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isMobile = window.innerWidth < 768;

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
      <div className="aspect-2/3">
        {/* Thumbnail */}
        <img
          src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${video.poster_path}`}
          className="w-full h-full object-cover object-center rounded-xl"
          alt=""
          loading="lazy"
        />
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
      />
    </div>
  );
};

export default MovieCard;
