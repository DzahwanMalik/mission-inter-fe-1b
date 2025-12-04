import { useState } from "react";
import type DiscoverMovies from "../../../types/discoverMovies";
import type User from "../../../types/user";
import type MovieDetail from "../../../types/movieDetail";
import HoveredMovieCard from "./HoveredMovieCard";
import MoviePopUpDetail from "./MoviePopUpDetail";

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
}: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div
      className="group w-full cursor-pointer"
      onMouseEnter={() => {
        setHoveredId(video.id);
        getMovieDetails(video.id);
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
      />
    </div>
  );
};

export default MovieCard;
